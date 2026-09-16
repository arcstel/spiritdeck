import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import {
  DIR_VEC,
  Dungeon,
  TILE_BARS,
  TILE_CHEST,
  TILE_DOOR,
  TILE_EXIT,
  TILE_KEY,
  TILE_STAIRS,
  TILE_VAULT,
  TILE_WALL,
  generateDungeon,
  generateTown,
  isSolid,
  rollEncounter,
  SPELLS,
} from "./data";
import { Input, Scene, mulberry32 } from "./engine";
import { C, drawAutomap, drawCompass, drawMemberCard, drawMessage, rect, text } from "./render";
import type { Host } from "./scenes";
import { VERSION } from "./version";
import { World, drawWorld, generateWorld } from "./worldmap";
import { townModel } from "./townkit";
import { gargoyleModel } from "./gargoylekit";

const VIEW = { x: 80, y: 6, w: 224, h: 134 };
const PANEL_W = 76;

/* ------------------------------------------------------------------ */
/* Layout constants (metres)                                           */
/* ------------------------------------------------------------------ */

const CW = 3.4;
const HALF = CW / 2;
const CH = 4.8;
const Z0 = 6;
const Z1 = -20;
const CLEN = Z0 - Z1;
const BAYS = 7;
const BAYW = CLEN / BAYS;
const SKY_Z = -1.3;

/** Yaw (radians) for each facing index 0=N,1=E,2=S,3=W. */
const DIR_YAW = [0, -Math.PI / 2, Math.PI, Math.PI / 2];

const PH = `${import.meta.env.BASE_URL}textures/ph`;

/* ------------------------------------------------------------------ */
/* Small canvas helpers (sky + flame sprite only)                      */
/* ------------------------------------------------------------------ */

function cnv(w: number, h: number): { c: HTMLCanvasElement; g: CanvasRenderingContext2D } {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) throw new Error("no 2d ctx");
  return { c, g };
}

/** Bright overcast daylight seen through the ceiling shaft. */
function makeSkyCanvas(size = 256): HTMLCanvasElement {
  const { c, g } = cnv(size, size);
  const rng = mulberry32(4242);
  const grd = g.createLinearGradient(0, 0, 0, size);
  grd.addColorStop(0, "#eaf4ff");
  grd.addColorStop(0.55, "#adc9ef");
  grd.addColorStop(1, "#7396c6");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 60; i++) {
    const cx = rng() * size;
    const cy = rng() * size;
    const rr = 20 + rng() * 80;
    g.fillStyle = `rgba(255,255,255,${(0.03 + rng() * 0.08).toFixed(3)})`;
    g.beginPath();
    g.ellipse(cx, cy, rr, rr * 0.5, rng() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

/** Soft additive glow sprite for the flame. */
function makeGlowCanvas(size = 128): HTMLCanvasElement {
  const { c, g } = cnv(size, size);
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, "rgba(255,246,214,1)");
  grd.addColorStop(0.2, "rgba(255,182,86,0.95)");
  grd.addColorStop(0.5, "rgba(255,116,34,0.4)");
  grd.addColorStop(1, "rgba(255,80,10,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  return c;
}

/** Soft round particle for dust motes. */
function makeDustCanvas(size = 32): HTMLCanvasElement {
  const { c, g } = cnv(size, size);
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, "rgba(255,235,200,0.9)");
  grd.addColorStop(1, "rgba(255,235,200,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  return c;
}

function canvasTex(canvas: HTMLCanvasElement, srgb: boolean): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(canvas);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function phTex(file: string, srgb: boolean, rx: number, ry: number): THREE.Texture {
  const t = new THREE.TextureLoader().load(`${PH}/${file}`);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}


/** aoMap samples the second UV set; mirror the first into it. */
function uv1(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  const uv = geo.getAttribute("uv");
  if (uv && !geo.getAttribute("uv1")) geo.setAttribute("uv1", uv);
  return geo;
}

/* ------------------------------------------------------------------ */
/* Materials + prop builders                                           */
/* ------------------------------------------------------------------ */

function matIron(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x2b2d33, roughness: 0.5, metalness: 0.85 });
}
function matGold(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.32, metalness: 0.9 });
}
function matBone(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0xd8d0b8, roughness: 0.8, metalness: 0.0 });
}
function matWood(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x46331e, roughness: 0.85, metalness: 0.03 });
}
function matStone(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x6a6961, roughness: 0.96, metalness: 0.0 });
}
function matDark(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x1b1c22, roughness: 1.0, metalness: 0.0 });
}
function matFur(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x3b332c, roughness: 1.0, metalness: 0.0 });
}

/** Wall brazier: an iron bracket jutting from the wall holding a burning bowl. */
function makeBrazier(): THREE.Group {
  const g = new THREE.Group();
  const iron = matIron();
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.55), iron);
  arm.position.set(0, 0, -0.24);
  g.add(arm);
  const brace = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.62, 0.08), iron);
  brace.position.set(0, -0.28, -0.42);
  brace.rotation.x = 0.6;
  g.add(brace);
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.15, 0.26, 12, 1, true), iron);
  bowl.position.set(0, 0.16, 0.02);
  g.add(bowl);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.028, 6, 14), iron);
  rim.rotation.x = Math.PI / 2;
  rim.position.set(0, 0.29, 0.02);
  g.add(rim);
  const coals = new THREE.Mesh(
    new THREE.SphereGeometry(0.21, 10, 7),
    new THREE.MeshStandardMaterial({ color: 0x180d06, emissive: 0xff4d10, emissiveIntensity: 1.4, roughness: 1 })
  );
  coals.scale.y = 0.55;
  coals.position.set(0, 0.24, 0.02);
  g.add(coals);
  g.userData.flame = { x: 0, y: 0.52, z: 0.02 };
  g.userData.light = { color: 0xffa24a, intensity: 18, dist: 13 };
  return g;
}

/** Dry stone fountain — a basin with a central pedestal, no water. */
function makeFountain(): THREE.Group {
  const g = new THREE.Group();
  const stone = matStone();
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.32, 0.72, 8), stone);
  basin.position.y = 0.36;
  g.add(basin);
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.5, 8, 1, true), matDark());
  inner.position.y = 0.52;
  g.add(inner);
  const floorIn = new THREE.Mesh(new THREE.CircleGeometry(0.92, 8), matDark());
  floorIn.rotation.x = -Math.PI / 2;
  floorIn.position.y = 0.3;
  g.add(floorIn);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.08, 6, 16), stone);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.72;
  g.add(rim);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 1.15, 8), stone);
  ped.position.y = 1.15;
  g.add(ped);
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.3, 0.24, 8, 1, true), stone);
  cup.position.y = 1.78;
  g.add(cup);
  const cupIn = new THREE.Mesh(new THREE.CircleGeometry(0.42, 8), matDark());
  cupIn.rotation.x = -Math.PI / 2;
  cupIn.position.y = 1.72;
  g.add(cupIn);
  return g;
}

/** Crouching gargoyle on a plinth. */
function makeGargoyle(): THREE.Group {
  const g = new THREE.Group();
  const stone = matStone();
  const ped = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.1, 0.92), stone);
  ped.position.y = 0.55;
  g.add(ped);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.12, 1.02), stone);
  cap.position.y = 1.16;
  g.add(cap);
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 9), stone);
  body.scale.set(1, 1.25, 1.15);
  body.position.y = 1.78;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 12, 9), stone);
  head.position.set(0, 2.28, 0.14);
  g.add(head);
  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.26, 6), stone);
  snout.rotation.x = Math.PI / 2;
  snout.position.set(0, 2.22, 0.36);
  g.add(snout);
  for (const s of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.3, 6), stone);
    horn.position.set(s * 0.15, 2.5, 0.06);
    horn.rotation.x = -0.5;
    g.add(horn);
    const wing = new THREE.Mesh(new THREE.ConeGeometry(0.52, 1.15, 4), stone);
    wing.scale.set(1, 1, 0.12);
    wing.position.set(s * 0.52, 1.95, -0.24);
    wing.rotation.z = s * 0.55;
    wing.rotation.x = 0.32;
    g.add(wing);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.5, 0.16), stone);
    arm.position.set(s * 0.4, 1.35, 0.22);
    arm.rotation.x = 0.5;
    g.add(arm);
  }
  return g;
}

/** Broken wooden table with a fallen plank. */
function makeTable(): THREE.Group {
  const g = new THREE.Group();
  const wood = matWood();
  for (const [x, z] of [
    [-0.6, -0.34],
    [0.6, -0.34],
    [-0.6, 0.34],
  ] as [number, number][]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.72, 0.12), wood);
    leg.position.set(x, 0.36, z);
    g.add(leg);
  }
  const topA = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.42), wood);
  topA.position.set(0, 0.74, -0.13);
  g.add(topA);
  const topB = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.38), wood);
  topB.position.set(0.08, 0.72, 0.28);
  topB.rotation.z = 0.05;
  g.add(topB);
  const fallen = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.38), wood);
  fallen.position.set(-0.15, 0.06, 0.72);
  fallen.rotation.set(0.08, 0.5, 0.12);
  g.add(fallen);
  return g;
}

/** Old map / chart hanging on the wall. */
function makeMapCanvas(size = 256): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d")!;
  const rng = mulberry32(9182);
  x.fillStyle = "#c9b587";
  x.fillRect(0, 0, size, size);
  for (let i = 0; i < 240; i++) {
    x.fillStyle = `rgba(90,68,36,${(0.02 + rng() * 0.06).toFixed(3)})`;
    x.beginPath();
    x.arc(rng() * size, rng() * size, 2 + rng() * 20, 0, 7);
    x.fill();
  }
  x.fillStyle = "#9f8c5e";
  x.strokeStyle = "#57431f";
  x.lineWidth = 2;
  x.beginPath();
  const cx = size * 0.5;
  const cy = size * 0.5;
  for (let a = 0; a <= 24; a++) {
    const t = (a / 24) * Math.PI * 2;
    const r = size * 0.3 + Math.sin(t * 3 + 1) * size * 0.06 + Math.sin(t * 7) * size * 0.03;
    const px = cx + Math.cos(t) * r;
    const py = cy + Math.sin(t) * r * 0.85;
    if (a === 0) x.moveTo(px, py);
    else x.lineTo(px, py);
  }
  x.closePath();
  x.fill();
  x.stroke();
  x.strokeStyle = "rgba(70,54,26,0.35)";
  x.lineWidth = 1;
  for (let i = 1; i < 8; i++) {
    x.beginPath();
    x.moveTo((size / 8) * i, 0);
    x.lineTo((size / 8) * i, size);
    x.moveTo(0, (size / 8) * i);
    x.lineTo(size, (size / 8) * i);
    x.stroke();
  }
  x.strokeStyle = "#3c2c12";
  x.lineWidth = 3;
  const rcx = size * 0.74;
  const rcy = size * 0.28;
  const rr = size * 0.09;
  x.beginPath();
  x.arc(rcx, rcy, rr, 0, 7);
  x.stroke();
  for (let a = 0; a < 4; a++) {
    const t = (a / 4) * Math.PI * 2;
    x.beginPath();
    x.moveTo(rcx + Math.cos(t) * rr, rcy + Math.sin(t) * rr);
    x.lineTo(rcx + Math.cos(t) * rr * 1.7, rcy + Math.sin(t) * rr * 1.7);
    x.stroke();
  }
  return c;
}

function makeWallMap(): THREE.Group {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.05, 0.06), matWood());
  g.add(frame);
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(1.16, 0.9),
    new THREE.MeshStandardMaterial({ map: canvasTex(makeMapCanvas(), true), roughness: 0.9, metalness: 0 })
  );
  art.position.z = 0.04;
  g.add(art);
  return g;
}

/** A span of vertical iron bars (a cell front / grate). */
function makeBars(span: number): THREE.Group {
  const g = new THREE.Group();
  const iron = matIron();
  const n = Math.max(4, Math.round(span / 0.42));
  for (let i = 0; i < n; i++) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.3, 6), iron);
    bar.position.set(-span / 2 + (i / (n - 1)) * span, 1.75, 0);
    g.add(bar);
  }
  for (const y of [0.5, 1.75, 3.0]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(span, 0.07, 0.07), iron);
    rail.position.set(0, y, 0);
    g.add(rail);
  }
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(span + 0.5, 1.6, 0.5), matStone());
  lintel.position.set(0, 3.95, 0);
  g.add(lintel);
  const sill = new THREE.Mesh(new THREE.BoxGeometry(span + 0.5, 0.36, 0.5), matStone());
  sill.position.set(0, 0.18, 0);
  g.add(sill);
  return g;
}

/** A small barred window set into a wall. */
function makeGrate(): THREE.Group {
  const g = new THREE.Group();
  const iron = matIron();
  const recess = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.25, 0.12), matDark());
  g.add(recess);
  for (let i = 0; i < 4; i++) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.25, 6), iron);
    bar.position.set(-0.36 + i * 0.24, 0, 0.06);
    g.add(bar);
  }
  for (const y of [-0.42, 0.42]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.06), iron);
    rail.position.set(0, y, 0.06);
    g.add(rail);
  }
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.16, 1.42, 0.08), matStone());
  frame.position.z = -0.03;
  g.add(frame);
  return g;
}

/** A heavy iron-banded door that can be locked. */
function makeDoor(): THREE.Group {
  const g = new THREE.Group();
  const wood = matWood();
  const panel = new THREE.Mesh(new THREE.BoxGeometry(2.9, 2.6, 0.16), wood);
  panel.position.y = 1.3;
  g.add(panel);
  for (const y of [0.5, 1.3, 2.1]) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.14, 0.2), matIron());
    band.position.set(0, y, 0.02);
    g.add(band);
  }
  const stud = matIron();
  for (let i = -2; i <= 2; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), stud);
    s.position.set(i * 0.55, 1.3, 0.14);
    g.add(s);
  }
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.026, 6, 10), matIron());
  handle.position.set(0.95, 1.25, 0.14);
  g.add(handle);
  for (const s of [-1, 1]) {
    const jamb = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.7, 0.44), matStone());
    jamb.position.set(s * 1.56, 1.35, 0);
    g.add(jamb);
  }
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.55, 0.44), matStone());
  lintel.position.y = 2.9;
  g.add(lintel);
  return g;
}

/** A glowing key resting on the floor. */
function makeKey(): THREE.Group {
  const g = new THREE.Group();
  const gold = matGold();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.44, 6), gold);
  shaft.rotation.z = Math.PI / 2;
  g.add(shaft);
  const bow = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.032, 6, 12), gold);
  bow.position.x = -0.28;
  g.add(bow);
  for (let i = 0; i < 3; i++) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.05), gold);
    tooth.position.set(0.16 - i * 0.08, -0.08, 0);
    g.add(tooth);
  }
  const light = new THREE.PointLight(0xffd27a, 7, 6, 2);
  light.position.y = 0.3;
  g.add(light);
  g.userData.spin = true;
  return g;
}

/** A slumped skeleton lying on the floor. */
function makeSkeleton(): THREE.Group {
  const g = new THREE.Group();
  const bone = matBone();
  for (let i = 0; i < 10; i++) {
    const v = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.055, 6), bone);
    v.rotation.z = Math.PI / 2;
    v.position.set(-0.16 + i * 0.047, 0.055, 0);
    g.add(v);
  }
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.135, 12, 9), bone);
  skull.scale.set(1.1, 1, 1.05);
  skull.position.set(-0.3, 0.1, 0);
  g.add(skull);
  const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.15), bone);
  jaw.position.set(-0.33, 0.035, 0);
  g.add(jaw);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.028, 6, 5), matDark());
    eye.position.set(-0.35, 0.13, s * 0.055);
    g.add(eye);
  }
  for (let i = 0; i < 5; i++) {
    const r = new THREE.Mesh(new THREE.TorusGeometry(0.14 - i * 0.006, 0.016, 5, 10, Math.PI * 1.25), bone);
    r.rotation.x = Math.PI / 2;
    r.rotation.z = -Math.PI * 0.12;
    r.position.set(0.0 + i * 0.062, 0.06, 0);
    g.add(r);
  }
  const pelvis = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.028, 5, 10), bone);
  pelvis.rotation.x = Math.PI / 2;
  pelvis.position.set(0.37, 0.06, 0);
  g.add(pelvis);
  const longBone = (len: number): THREE.Mesh => new THREE.Mesh(new THREE.CapsuleGeometry(0.022, len, 4, 6), bone);
  for (const s of [-1, 1]) {
    const upper = longBone(0.36);
    upper.rotation.z = Math.PI / 2;
    upper.rotation.y = s * 0.5;
    upper.position.set(0.12, 0.05, s * 0.22);
    g.add(upper);
    const lower = longBone(0.34);
    lower.rotation.z = Math.PI / 2;
    lower.rotation.y = s * 0.2;
    lower.position.set(0.5, 0.05, s * 0.33);
    g.add(lower);
    const femur = longBone(0.42);
    femur.rotation.z = Math.PI / 2;
    femur.rotation.y = s * 0.35;
    femur.position.set(0.6, 0.05, s * 0.16);
    g.add(femur);
  }
  const hand = longBone(0.2);
  hand.rotation.z = Math.PI / 2;
  hand.position.set(0.06, 0.045, 0.62);
  g.add(hand);
  g.rotation.y = (Math.sin(g.position.x) + 1) * 2;
  return g;
}

/** An ornate double vault door with gilt trim and a carved seal. */
function makeVaultDoor(): THREE.Group {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x3a2a17, roughness: 0.7, metalness: 0.1 });
  const gold = matGold();
  for (const s of [-1, 1]) {
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(1.42, 2.75, 0.2), wood);
    leaf.position.set(s * 0.73, 1.38, 0);
    g.add(leaf);
    for (const y of [0.45, 1.38, 2.3]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.16, 0.26), gold);
      band.position.set(s * 0.73, y, 0.03);
      g.add(band);
    }
    const stud = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), gold);
    stud.position.set(s * 0.73, 1.38, 0.16);
    g.add(stud);
  }
  const sealRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 8, 20), gold);
  sealRing.position.set(0, 1.95, 0.18);
  g.add(sealRing);
  const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.1, 8), wood);
  seal.rotation.x = Math.PI / 2;
  seal.position.set(0, 1.95, 0.16);
  g.add(seal);
  const keyhole = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.06), matDark());
  keyhole.position.set(0, 1.95, 0.22);
  g.add(keyhole);
  for (const s of [-1, 1]) {
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 6, 12), gold);
    handle.position.set(s * 0.5, 1.35, 0.2);
    g.add(handle);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.2, 8), matStone());
    pillar.position.set(s * 1.62, 1.6, 0);
    g.add(pillar);
    const grg = makeGargoyle();
    grg.scale.set(0.62, 0.62, 0.62);
    grg.position.set(s * 1.62, 3.2, 0.1);
    g.add(grg);
  }
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.7, 0.5), matStone());
  lintel.position.y = 3.1;
  g.add(lintel);
  const glow = new THREE.PointLight(0xffd27a, 4, 6, 2);
  glow.position.set(0, 2.4, 0.5);
  g.add(glow);
  return g;
}

/** An arched gate opening onto daylight, back to the surface. */
function makeExitGate(): THREE.Group {
  const g = new THREE.Group();
  const stone = matStone();
  for (const s of [-1, 1]) {
    const pil = new THREE.Mesh(new THREE.BoxGeometry(0.55, 3.3, 0.55), stone);
    pil.position.set(s * 1.4, 1.65, 0);
    g.add(pil);
  }
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.65, 0.65), stone);
  lintel.position.y = 3.5;
  g.add(lintel);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.3, 0.9), stone);
  cap.position.y = 3.9;
  g.add(cap);
  for (const s of [-1, 1]) {
    const torch = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.3), matIron());
    torch.position.set(s * 1.4, 2.2, 0.35);
    g.add(torch);
  }
  const daylight = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 3.3),
    new THREE.MeshBasicMaterial({ map: canvasTex(makeSkyCanvas(128), true), toneMapped: false })
  );
  daylight.position.set(0, 1.75, -0.05);
  g.add(daylight);
  const sun = new THREE.PointLight(0xffe9c0, 9, 16, 2);
  sun.position.set(0, 2.5, 1.2);
  g.add(sun);
  return g;
}

/** A small skittering rat. */
function makeRat(): THREE.Group {
  const g = new THREE.Group();
  const fur = matFur();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), fur);
  body.scale.set(1, 0.85, 1.7);
  body.position.y = 0.1;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), fur);
  head.position.set(0, 0.1, 0.19);
  g.add(head);
  const snout = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.09, 6), fur);
  snout.rotation.x = Math.PI / 2;
  snout.position.set(0, 0.09, 0.28);
  g.add(snout);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.CircleGeometry(0.045, 8), fur);
    ear.position.set(s * 0.05, 0.16, 0.16);
    ear.rotation.y = s * 0.6;
    g.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.012, 5, 4), new THREE.MeshBasicMaterial({ color: 0x201010 }));
    eye.position.set(s * 0.04, 0.12, 0.23);
    g.add(eye);
    for (const zz of [0.13, -0.13]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 5), fur);
      leg.position.set(s * 0.07, 0.05, zz);
      g.add(leg);
    }
  }
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.006, 0.4, 5), fur);
  tail.rotation.x = Math.PI / 2.4;
  tail.position.set(0, 0.12, -0.32);
  g.add(tail);
  g.userData.rat = true;
  return g;
}

/* ------------------------------------------------------------------ */
/* Town props                                                          */
/* ------------------------------------------------------------------ */

function matFlat(color: number, rough = 0.9): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.0 });
}

function makeSignBoard(text: string): THREE.Group {
  const g = new THREE.Group();
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 64;
  const x = c.getContext("2d")!;
  x.fillStyle = "#3a2a17";
  x.fillRect(0, 0, 128, 64);
  x.strokeStyle = "#c9a24a";
  x.lineWidth = 4;
  x.strokeRect(3, 3, 122, 58);
  x.fillStyle = "#e8d9a8";
  x.font = "bold 26px monospace";
  x.textAlign = "center";
  x.fillText(text, 64, 42);
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.7, 0.1),
    new THREE.MeshStandardMaterial({ map: canvasTex(c, true), roughness: 0.8 })
  );
  g.add(board);
  for (const s of [-1, 1]) {
    const hook = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), matIron());
    hook.position.set(s * 0.55, 0.5, 0);
    g.add(hook);
  }
  return g;
}

function makeHouse(bw: number, bd: number, bh: number, wall: number, roof: number): THREE.Group {
  const g = new THREE.Group();
  const walls = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), matFlat(wall, 0.92));
  walls.position.y = bh / 2;
  g.add(walls);
  const roofMesh = new THREE.Mesh(new THREE.ConeGeometry(Math.max(bw, bd) * 0.76, bh * 0.72, 4), matFlat(roof, 0.85));
  roofMesh.rotation.y = Math.PI / 4;
  roofMesh.position.y = bh + bh * 0.36;
  g.add(roofMesh);
  const beam = matFlat(0x3a2a1a, 0.95);
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, bh, 0.18), beam);
    post.position.set(s * (bw / 2 - 0.12), bh / 2, bd / 2);
    g.add(post);
  }
  const cross = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.18, 0.18), beam);
  cross.position.set(0, bh * 0.64, bd / 2);
  g.add(cross);
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.7, 0.12), matFlat(0x39281a));
  door.position.set(0, 0.85, bd / 2 + 0.03);
  g.add(door);
  const winMat = new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0xffb050, emissiveIntensity: 0.6, roughness: 0.6 });
  for (const s of [-1, 1]) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.08), winMat);
    w.position.set(s * (bw / 2 - 0.8), bh * 0.62, bd / 2 + 0.02);
    g.add(w);
  }
  return g;
}

function makeStall(color: number): THREE.Group {
  const g = new THREE.Group();
  const wood = matFlat(0x5a4126, 0.9);
  const table = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.1), wood);
  table.position.y = 0.9;
  g.add(table);
  for (const [lx, lz] of [
    [-1, -0.45],
    [1, -0.45],
    [-1, 0.45],
    [1, 0.45],
  ] as [number, number][]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.1), wood);
    leg.position.set(lx, 0.45, lz);
    g.add(leg);
  }
  for (const lx of [-1.05, 1.05]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.3, 6), wood);
    pole.position.set(lx, 1.15, -0.5);
    g.add(pole);
  }
  const awn = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 1.7), matFlat(color, 0.8));
  awn.position.set(0, 2.25, -0.1);
  awn.rotation.x = -0.13;
  g.add(awn);
  const fruitCols = [0xd23b2e, 0xe8a13a, 0x8bbf3a];
  for (let i = 0; i < 3; i++) {
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.5), wood);
    crate.position.set(-0.7 + i * 0.7, 1.05, 0.1);
    g.add(crate);
    for (let f = 0; f < 4; f++) {
      const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.09, 7, 6), matFlat(fruitCols[i], 0.7));
      fruit.position.set(-0.7 + i * 0.7 + (f % 2 ? 0.11 : -0.11), 1.22, 0.1 + (f < 2 ? 0.11 : -0.11));
      g.add(fruit);
    }
  }
  return g;
}

function makeTent(color: number): THREE.Group {
  const g = new THREE.Group();
  const tent = new THREE.Mesh(new THREE.ConeGeometry(1.55, 2.5, 10), matFlat(color, 0.9));
  tent.position.y = 1.25;
  g.add(tent);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.7, 6), matFlat(0x5a4126));
  pole.position.y = 1.35;
  g.add(pole);
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.32), matFlat(0xe8d9a8, 0.9));
  flag.position.set(0.3, 2.55, 0);
  g.add(flag);
  return g;
}

function makeWell(): THREE.Group {
  const g = new THREE.Group();
  const stone = matStone();
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.98, 0.9, 12, 1, true), stone);
  ring.position.y = 0.45;
  g.add(ring);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.1, 6, 16), stone);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.9;
  g.add(rim);
  const hole = new THREE.Mesh(new THREE.CircleGeometry(0.8, 12), matDark());
  hole.rotation.x = -Math.PI / 2;
  hole.position.y = 0.35;
  g.add(hole);
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.0, 0.14), matFlat(0x5a4126));
    post.position.set(s * 0.8, 1.6, 0);
    g.add(post);
  }
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.35, 0.7, 4), matFlat(0x5a3a22, 0.9));
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 2.85;
  g.add(roof);
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.3, 8), matFlat(0x5a4126));
  bucket.position.set(0, 1.6, 0);
  g.add(bucket);
  return g;
}

function makeLamp(): THREE.Group {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 3.0, 8), matIron());
  post.position.y = 1.5;
  g.add(post);
  const lantern = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.5, 0.36),
    new THREE.MeshStandardMaterial({ color: 0x2a2418, emissive: 0xffb050, emissiveIntensity: 1.0, roughness: 0.6 })
  );
  lantern.position.y = 3.05;
  g.add(lantern);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.25, 4), matIron());
  cap.position.y = 3.42;
  g.add(cap);
  const light = new THREE.PointLight(0xffc070, 6, 11, 2);
  light.position.y = 3.05;
  g.add(light);
  return g;
}

function makeCrate(): THREE.Group {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), matFlat(0x6a4a2a, 0.95));
  box.position.y = 0.35;
  g.add(box);
  for (const y of [0.12, 0.58]) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.06, 0.74), matFlat(0x3a2a1a));
    band.position.y = y;
    g.add(band);
  }
  return g;
}


function makeStairwell(): THREE.Group {
  const g = new THREE.Group();
  const stone = matStone();
  // dark landing "hole" drawn just above the floor
  const landing = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.0), matDark());
  landing.rotation.x = -Math.PI / 2;
  landing.position.set(0, 0.04, 0);
  g.add(landing);
  // stone rim around the opening
  for (const [dx, dz] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ] as [number, number][]) {
    const rim = new THREE.Mesh(new THREE.BoxGeometry(dx === 0 ? 3.4 : 0.28, 0.26, dz === 0 ? 3.4 : 0.28), stone);
    rim.position.set(dx * 1.56, 0.13, dz * 1.56);
    g.add(rim);
  }
  // steps descending into the dark landing
  for (let i = 0; i < 5; i++) {
    const h = 0.34 - i * 0.055;
    const step = new THREE.Mesh(new THREE.BoxGeometry(2.5, h, 0.5), stone);
    step.position.set(0, h / 2 + 0.04, -1.15 + i * 0.5);
    g.add(step);
  }
  const glow = new THREE.PointLight(0x9fc0ff, 7, 9, 2);
  glow.position.set(0, 1.0, 0);
  g.add(glow);
  return g;
}

/** Clay storage urn. */
function makeUrn(): THREE.Group {
  const g = new THREE.Group();
  const clay = new THREE.MeshStandardMaterial({ color: 0x6d4a33, roughness: 0.85, metalness: 0.05 });
  const prof: [number, number][] = [
    [0.03, 0],
    [0.17, 0.02],
    [0.25, 0.22],
    [0.29, 0.46],
    [0.23, 0.7],
    [0.14, 0.8],
    [0.18, 0.9],
    [0.16, 0.96],
  ];
  const body = new THREE.Mesh(new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 14), clay);
  g.add(body);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.02, 6, 14), clay);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.96;
  g.add(rim);
  return g;
}

/** Wooden barrel with iron hoops. */
function makeBarrel(): THREE.Group {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x4a3722, roughness: 0.85, metalness: 0.03 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.82, 12), wood);
  body.position.y = 0.41;
  g.add(body);
  for (const y of [0.12, 0.41, 0.7]) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.022, 6, 14), matIron());
    hoop.rotation.x = Math.PI / 2;
    hoop.position.y = y;
    g.add(hoop);
  }
  const lid = new THREE.Mesh(new THREE.CircleGeometry(0.29, 12), wood);
  lid.rotation.x = -Math.PI / 2;
  lid.position.y = 0.82;
  g.add(lid);
  return g;
}

function makeWebCanvas(size = 64): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d")!;
  x.clearRect(0, 0, size, size);
  x.strokeStyle = "rgba(222,228,238,0.9)";
  x.lineWidth = 1;
  const cx = size / 2;
  const cy = size / 2;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    x.beginPath();
    x.moveTo(cx, cy);
    x.lineTo(cx + Math.cos(a) * size * 0.5, cy + Math.sin(a) * size * 0.5);
    x.stroke();
  }
  for (let r = size * 0.09; r < size * 0.5; r += size * 0.085) {
    x.beginPath();
    x.arc(cx, cy, r, 0, Math.PI * 2);
    x.stroke();
  }
  return c;
}

/** Cobwebs hanging in an upper corner. */
function makeCobweb(): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    map: canvasTex(makeWebCanvas(64), true),
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  for (let i = 0; i < 3; i++) {
    const q = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), mat);
    q.rotation.set(-Math.PI / 2 + 0.35, i * 1.1, 0);
    q.position.set(0, 3.9 - i * 0.18, 0);
    g.add(q);
  }
  return g;
}

/** Chains hanging from the ceiling (prison feel). */
function makeChains(): THREE.Group {
  const g = new THREE.Group();
  const iron = matIron();
  for (const off of [-0.32, 0.32]) {
    for (let i = 0; i < 7; i++) {
      const link = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.018, 5, 8), iron);
      link.rotation.y = i % 2 === 0 ? 0 : Math.PI / 2;
      link.position.set(off, 4.4 - i * 0.13, 0);
      g.add(link);
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 6, 10), iron);
    ring.position.set(off, 3.42, 0);
    g.add(ring);
  }
  return g;
}


/* ------------------------------------------------------------------ */
/* Geometry helpers                                                    */
/* ------------------------------------------------------------------ */

function archPath(cx: number, y0: number, top: number, r: number): THREE.Path {
  const p = new THREE.Path();
  const arcY = top - r;
  p.moveTo(cx - r, y0);
  p.lineTo(cx - r, arcY);
  p.absarc(cx, arcY, r, Math.PI, 0, true);
  p.lineTo(cx + r, y0);
  p.closePath();
  return p;
}

/** A wall of length `len` and height `h` pierced by `bays` tall arched openings. */
function arcadeGeometry(len: number, h: number, bays: number, thickness: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(len, 0);
  shape.lineTo(len, h);
  shape.lineTo(0, h);
  shape.closePath();
  const bayW = len / bays;
  const openW = bayW * 0.6;
  const y0 = 0.85;
  const top = h - 1.0;
  const r = openW / 2;
  for (let i = 0; i < bays; i++) {
    shape.holes.push(archPath(bayW * (i + 0.5), y0, top, r));
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 12 });
  geo.computeVertexNormals();
  return uv1(geo);
}

/* ------------------------------------------------------------------ */
/* The hall                                                            */
/* ------------------------------------------------------------------ */

interface Flame {
  sprite: THREE.Sprite;
  phase: number;
  x: number;
  y: number;
  z: number;
  ly: number;
}

interface Rat {
  obj: THREE.Group;
  hx: number;
  hz: number;
  tx: number;
  tz: number;
  speed: number;
  phase: number;
}

function fireSprite(tex: THREE.Texture): THREE.Sprite {
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: tex,
      color: 0xffb060,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      toneMapped: false,
    })
  );
  s.scale.set(0.5, 0.72, 1);
  return s;
}

export class Hall3D {
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private flames: Flame[] = [];
  private rats: Rat[] = [];
  private blocks = new Set<number>();
  private doorMeshes = new Map<number, THREE.Object3D>();
  private exitCell: [number, number] | null = null;
  private shops: { kind: string; gx: number; gy: number; name: string }[] = [];
  private kind: "dungeon" | "town" = "dungeon";
  private radius = 0.42;
  private stepTween: { fx: number; fz: number; tx: number; tz: number; t: number; dur: number } | null = null;
  private turnTween: { from: number; to: number; t: number; dur: number } | null = null;
  private dust: THREE.Points | null = null;
  private dustPos: Float32Array | null = null;
  private shaft: THREE.Mesh | null = null;
  private pos = new THREE.Vector3(0, 1.62, 5.0);
  private yaw = 0;
  private t = 0;
  private ready = false;
  private lastW = -1;
  private lastH = -1;
  private gcs = 3.4;
  private lightPool: THREE.PointLight[] = [];
  private playerLight: THREE.PointLight | null = null;
  private props: { obj: THREE.Object3D; gx: number; gy: number; type: "chest" | "stairs" | "key" }[] = [];

  constructor(private canvas: HTMLCanvasElement, private grid?: Dungeon) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    this.camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.05, 200);
    if (this.grid) this.placeAtStart(this.grid);
    this.applyPoseParam();
    this.camera.position.copy(this.pos);
    this.scene.fog = new THREE.FogExp2(0x05070c, 0.032);
    this.scene.background = new THREE.Color(0x04050a);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1024, 576), 0.55, 0.55, 0.82);
    this.composer.addPass(bloom);
    this.composer.addPass(new OutputPass());

    this.build();
    for (let i = 0; i < 14; i++) {
      const l = new THREE.PointLight(0xffa860, 0, 6.5, 2);
      this.scene.add(l);
      this.lightPool.push(l);
    }
    if (this.grid) {
      this.playerLight = new THREE.PointLight(0xffe0b0, 2.8, 9.0, 2);
      this.scene.add(this.playerLight);
    }
    this.ready = true;
  }

  private applyPoseParam(): void {
    const pose = new URLSearchParams(location.search).get("pose");
    if (pose && this.grid) {
      const p = pose.split(",").map(Number);
      if (Number.isFinite(p[0]) && Number.isFinite(p[1])) this.pos.set(p[0] * this.gcs, 1.62, p[1] * this.gcs);
      if (Number.isFinite(p[2])) this.yaw = DIR_YAW[((p[2] % 4) + 4) % 4];
    }
  }

  private placeAtStart(g: Dungeon): void {
    const s = g.start;
    this.pos.set(s.x * this.gcs, 1.62, s.y * this.gcs);
    const openAt = (x: number, y: number): boolean =>
      x >= 0 && y >= 0 && x < g.w && y < g.h && g.tiles[y * g.w + x] !== TILE_WALL;
    const run = (dx: number, dy: number): number => {
      let n = 0;
      for (let k = 1; k < 16; k++) {
        if (!openAt(s.x + dx * k, s.y + dy * k)) break;
        n++;
      }
      return n;
    };
    let dir = s.dir;
    let best = -1;
    for (let dd = 0; dd < 4; dd++) {
      const v = DIR_VEC[dd];
      const r = run(v.x, v.y);
      if (r > best) {
        best = r;
        dir = dd;
      }
    }
    this.yaw = DIR_YAW[dir];
  }

  /** Tear down the current floor and build a new one in place. */
  reset(d: Dungeon): void {
    this.kind = "dungeon";
    this.gcs = 3.4;
    this.scene.fog = new THREE.FogExp2(0x05070c, 0.032);
    this.scene.background = new THREE.Color(0x04050a);
    this.renderer.toneMappingExposure = 1.06;
    for (const child of [...this.scene.children]) this.scene.remove(child);
    this.flames = [];
    this.rats = [];
    this.blocks = new Set();
    this.doorMeshes = new Map();
    this.exitCell = null;
    this.props = [];
    this.stepTween = null;
    this.turnTween = null;
    this.dust = null;
    this.dustPos = null;
    this.shaft = null;
    this.lightPool = [];
    this.playerLight = null;
    this.grid = d;
    this.placeAtStart(d);
    this.build();
    for (let i = 0; i < 14; i++) {
      const l = new THREE.PointLight(0xffa860, 0, 6.5, 2);
      this.scene.add(l);
      this.lightPool.push(l);
    }
    this.playerLight = new THREE.PointLight(0xffe0b0, 2.8, 9.0, 2);
    this.scene.add(this.playerLight);
  }

  cell(): [number, number] {
    return [Math.round(this.pos.x / this.gcs), Math.round(this.pos.z / this.gcs)];
  }

  exit(): [number, number] | null {
    return this.exitCell;
  }

  isTown(): boolean {
    return this.kind === "town";
  }

  nearestShop(gx: number, gy: number): { kind: string; gx: number; gy: number; name: string } | null {
    let best: { kind: string; gx: number; gy: number; name: string } | null = null;
    let bd = 99;
    for (const s of this.shops) {
      const dd = Math.abs(s.gx - gx) + Math.abs(s.gy - gy);
      if (dd < bd) {
        bd = dd;
        best = s;
      }
    }
    return bd <= 2 ? best : null;
  }

  /** Build the outdoors market town from a town grid + the medieval kit. */
  loadTown(d: Dungeon): void {
    for (const child of [...this.scene.children]) this.scene.remove(child);
    this.kind = "town";
    this.gcs = 4.0;
    this.flames = [];
    this.rats = [];
    this.blocks = new Set();
    this.doorMeshes = new Map();
    this.exitCell = null;
    this.shops = [];
    this.props = [];
    this.stepTween = null;
    this.turnTween = null;
    this.dust = null;
    this.dustPos = null;
    this.shaft = null;
    this.lightPool = [];
    this.playerLight = null;
    this.grid = d;
    this.placeAtStart(d);
    this.applyPoseParam();
    this.buildTown(d);
  }

  private blockRect(gx: number, gy: number, halfX: number, halfZ: number): void {
    const d = this.grid;
    if (!d) return;
    const CS = this.gcs;
    const x0 = Math.round((gx * CS - halfX) / CS);
    const x1 = Math.round((gx * CS + halfX) / CS);
    const z0 = Math.round((gy * CS - halfZ) / CS);
    const z1 = Math.round((gy * CS + halfZ) / CS);
    for (let y = z0; y <= z1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (x < 0 || y < 0 || x >= d.w || y >= d.h) continue;
        this.blocks.add(y * d.w + x);
      }
    }
  }

  private buildTown(d: Dungeon): void {
    const CS = this.gcs;
    this.scene.fog = new THREE.Fog(0xc3d6ea, 46, 180);
    this.scene.background = new THREE.Color(0x9dc4e8);
    this.renderer.toneMappingExposure = 1.12;

    const stone = new THREE.MeshStandardMaterial({
      map: phTex("cobblestone_floor_08_Diffuse.jpg", true, (d.w * CS) / 4, (d.h * CS) / 4),
      normalMap: phTex("cobblestone_floor_08_nor_gl.jpg", false, (d.w * CS) / 4, (d.h * CS) / 4),
      roughnessMap: phTex("cobblestone_floor_08_Rough.jpg", false, (d.w * CS) / 4, (d.h * CS) / 4),
      aoMap: phTex("cobblestone_floor_08_AO.jpg", false, (d.w * CS) / 4, (d.h * CS) / 4),
      aoMapIntensity: 0.7,
      roughness: 1,
      metalness: 0,
      color: 0xb9b2a4,
    });
    const gGeo = new THREE.PlaneGeometry(d.w * CS, d.h * CS).rotateX(-Math.PI / 2);
    uv1(gGeo);
    const ground = new THREE.Mesh(gGeo, stone);
    ground.position.set(((d.w - 1) * CS) / 2, 0.01, ((d.h - 1) * CS) / 2);
    this.scene.add(ground);

    this.scene.add(new THREE.AmbientLight(0x9fb4cc, 0.75));
    this.scene.add(new THREE.HemisphereLight(0xbcd8ff, 0x6b5a3a, 1.05));
    const sun = new THREE.DirectionalLight(0xfff1d4, 2.3);
    sun.position.set(34, 56, -26);
    sun.target.position.set(((d.w - 1) * CS) / 2, 0, ((d.h - 1) * CS) / 2);
    this.scene.add(sun);
    this.scene.add(sun.target);

    const put = (obj: THREE.Object3D, gx: number, gy: number, rot: number): void => {
      obj.position.set(gx * CS, 0, gy * CS);
      obj.rotation.y = rot;
      this.scene.add(obj);
    };

    for (const dc of d.decor ?? []) {
      const rot = dc.rot ?? 0;
      const name = dc.model ?? "";
      const m = name ? townModel(name) : null;
      if (m && (name === "town_wall_straight" || name === "town_wall_gate")) {
        m.scale.set((CS * 2) / 10.27, 1, 1);
      }
      if (m && name === "cobblestone_square") {
        m.scale.set(CS / 8, CS / 8, 1);
      }
      if (m) {
        put(m, dc.x, dc.y, rot);
      } else {
        if (dc.kind === "inn") put(makeHouse(7, 6, 4.5, 0xe8dcc0, 0x7a3a2a), dc.x, dc.y, rot);
        else if (dc.kind === "blacksmith") put(makeHouse(5.5, 5, 3.8, 0x8a7a68, 0x4a3a2a), dc.x, dc.y, rot);
        else if (dc.kind === "magician") put(makeTent(0x5a3a8a), dc.x, dc.y, rot);
        else if (dc.kind === "stall") put(makeStall([0xa83a3a, 0x3a6a3a, 0x2f4f8a, 0xb8862f][(dc.x + dc.y) % 4]), dc.x, dc.y, rot);
        else if (dc.kind === "well") put(makeWell(), dc.x, dc.y, rot);
        else if (dc.kind === "lamp") put(makeLamp(), dc.x, dc.y, rot);
        else if (dc.kind === "crate") put(makeCrate(), dc.x, dc.y, rot);
        else if (dc.kind === "wall") {
          const w = new THREE.Mesh(new THREE.BoxGeometry(CS * 2, 3.0, 0.6), matStone());
          put(w, dc.x, dc.y, rot);
        } else if (dc.kind === "gate") put(makeExitGate(), dc.x, dc.y, rot);
        else if (dc.kind === "prop") put(makeCrate(), dc.x, dc.y, rot);
      }

      if (dc.kind === "inn" || dc.kind === "blacksmith" || dc.kind === "magician" || dc.kind === "prop") {
        const hd = name.endsWith("_hd");
        const a = hd ? 5.4 : 5;
        const b = hd ? 4.8 : 3.3;
        const along = Math.abs(Math.cos(rot)) > 0.5;
        this.blockRect(dc.x, dc.y, along ? a : b, along ? b : a);
      } else if (dc.kind === "stall" || dc.kind === "crate" || dc.kind === "well") {
        this.blockRect(dc.x, dc.y, 0.5, 0.5);
      }

      if (dc.kind === "inn" && name) {
        const sign = makeSignBoard(name === "inn" ? "INN" : "TAVERN");
        sign.position.set(dc.x * CS + 3.2, 3.0, dc.y * CS + 3.2);
        sign.rotation.y = -Math.PI / 4;
        this.scene.add(sign);
      }
      if (dc.kind === "lamp") {
        const l = new THREE.PointLight(0xffc070, 5, 12, 2);
        l.position.set(dc.x * CS, 3.1, dc.y * CS);
        this.scene.add(l);
      }
      if (dc.kind === "inn" || dc.kind === "blacksmith" || dc.kind === "magician" || dc.kind === "stall" || dc.kind === "well") {
        this.shops.push({ kind: dc.kind, gx: dc.x, gy: dc.y, name });
      }
    }

    for (let gy = 0; gy < d.h; gy++) {
      for (let gx = 0; gx < d.w; gx++) {
        if (d.tiles[gy * d.w + gx] === TILE_EXIT) this.exitCell = [gx, gy];
      }
    }
  }

  takeAt(gx: number, gy: number): "chest" | "stairs" | "key" | null {
    const idx = this.props.findIndex((p) => p.gx === gx && p.gy === gy);
    if (idx < 0) return null;
    const p = this.props[idx];
    p.obj.removeFromParent();
    this.props.splice(idx, 1);
    return p.type;
  }

  private build(): void {
    if (this.grid) {
      this.buildGrid(this.grid);
      return;
    }
    // ----- materials (photoscanned CC0 PBR) -----
    const wallMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, 0.5, 0.5),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, 0.5, 0.5),
      roughnessMap: phTex("rustic_stone_wall_Rough.jpg", false, 0.5, 0.5),
      aoMap: phTex("rustic_stone_wall_AO.jpg", false, 0.5, 0.5),
      aoMapIntensity: 1.1,
      roughness: 1.0,
      metalness: 0.0,
      color: 0xc6cdd6,
    });
    const ribMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, 0.9, 0.9),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, 0.9, 0.9),
      roughnessMap: phTex("rustic_stone_wall_Rough.jpg", false, 0.9, 0.9),
      aoMap: phTex("rustic_stone_wall_AO.jpg", false, 0.9, 0.9),
      aoMapIntensity: 1.0,
      roughness: 1.0,
      metalness: 0.0,
      color: 0xb9b2a4,
    });
    const floorMat = new THREE.MeshStandardMaterial({
      map: phTex("cobblestone_floor_08_Diffuse.jpg", true, CW / 2.4, CLEN / 2.4),
      normalMap: phTex("cobblestone_floor_08_nor_gl.jpg", false, CW / 2.4, CLEN / 2.4),
      roughnessMap: phTex("cobblestone_floor_08_Rough.jpg", false, CW / 2.4, CLEN / 2.4),
      aoMap: phTex("cobblestone_floor_08_AO.jpg", false, CW / 2.4, CLEN / 2.4),
      aoMapIntensity: 1.0,
      roughness: 1.0,
      metalness: 0.0,
    });
    const ceilMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, 0.7, 0.7),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, 0.7, 0.7),
      roughnessMap: phTex("rustic_stone_wall_Rough.jpg", false, 0.7, 0.7),
      aoMap: phTex("rustic_stone_wall_AO.jpg", false, 0.7, 0.7),
      roughness: 1.0,
      metalness: 0.0,
      color: 0x6e6a60,
    });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0d0b09, roughness: 1 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x141110, roughness: 0.55, metalness: 0.75 });

    const group = new THREE.Group();
    this.scene.add(group);

    // floor
    const floor = new THREE.Mesh(uv1(new THREE.PlaneGeometry(CW, CLEN)), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, (Z0 + Z1) / 2);
    group.add(floor);

    // ceiling with a rectangular skylight opening
    const ceilShape = new THREE.Shape();
    ceilShape.moveTo(0, 0);
    ceilShape.lineTo(CW, 0);
    ceilShape.lineTo(CW, CLEN);
    ceilShape.lineTo(0, CLEN);
    ceilShape.closePath();
    const hole = new THREE.Path();
    const hx0 = HALF - 1.0;
    const hx1 = HALF + 1.0;
    const hy0 = Z0 - (SKY_Z + 1.4);
    const hy1 = Z0 - (SKY_Z - 1.4);
    hole.moveTo(hx0, hy0);
    hole.lineTo(hx1, hy0);
    hole.lineTo(hx1, hy1);
    hole.lineTo(hx0, hy1);
    hole.closePath();
    ceilShape.holes.push(hole);
    const ceil = new THREE.Mesh(uv1(new THREE.ShapeGeometry(ceilShape, 12)), ceilMat);
    ceil.rotation.x = -Math.PI / 2;
    ceil.position.set(-HALF, CH, Z0);
    group.add(ceil);

    // skylight shaft walls + daylight cap
    const SH = 1.1;
    const shaftMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, 0.8, 0.5),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, 0.8, 0.5),
      roughness: 1.0,
      metalness: 0.0,
      color: 0xdbe4ee,
      emissive: 0x22303f,
      emissiveIntensity: 1.0,
    });
    const shaftSide = (w: number, x: number, z: number, ry: number): THREE.Mesh => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, SH), shaftMat);
      m.position.set(x, CH + SH / 2, z);
      m.rotation.y = ry;
      return m;
    };
    group.add(shaftSide(2.8, 1.0, SKY_Z, -Math.PI / 2));
    group.add(shaftSide(2.8, -1.0, SKY_Z, Math.PI / 2));
    group.add(shaftSide(2.0, 0, SKY_Z + 1.4, Math.PI));
    group.add(shaftSide(2.0, 0, SKY_Z - 1.4, 0));

    const sky = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.8),
      new THREE.MeshBasicMaterial({ map: canvasTex(makeSkyCanvas(256), true), toneMapped: false })
    );
    sky.rotation.x = Math.PI / 2;
    sky.position.set(0, CH + SH - 0.02, SKY_Z);
    group.add(sky);
    this.shaft = null;

    // side walls
    const left = new THREE.Mesh(arcadeGeometry(CLEN, CH, BAYS, 0.45), wallMat);
    left.rotation.y = -Math.PI / 2;
    left.position.set(-HALF, 0, Z1);
    group.add(left);
    const right = new THREE.Mesh(arcadeGeometry(CLEN, CH, BAYS, 0.45), wallMat);
    right.rotation.y = Math.PI / 2;
    right.position.set(HALF, 0, Z0);
    group.add(right);

    // dark recesses seen through the side arches
    for (const sx of [-1, 1]) {
      const rec = new THREE.Mesh(new THREE.PlaneGeometry(CLEN, CH), darkMat);
      rec.rotation.y = sx < 0 ? Math.PI / 2 : -Math.PI / 2;
      rec.position.set(sx * (HALF + 0.62), CH / 2, (Z0 + Z1) / 2);
      group.add(rec);
    }

    // transverse ribs
    const ribGeo = uv1(new THREE.TorusGeometry(HALF, 0.15, 10, 52, Math.PI));
    for (let i = 1; i < BAYS; i++) {
      const rib = new THREE.Mesh(ribGeo, ribMat);
      rib.position.set(0, CH - HALF, Z0 - i * BAYW);
      rib.scale.set(1, 1, 1.7);
      group.add(rib);
    }

    // far wall with a gothic doorway
    const farShape = new THREE.Shape();
    farShape.moveTo(0, 0);
    farShape.lineTo(CW, 0);
    farShape.lineTo(CW, CH);
    farShape.lineTo(0, CH);
    farShape.closePath();
    farShape.holes.push(archPath(HALF, 0, 2.9, 0.82));
    const far = new THREE.Mesh(
      uv1(new THREE.ExtrudeGeometry(farShape, { depth: 0.45, bevelEnabled: false, curveSegments: 14 })),
      wallMat
    );
    far.position.set(-HALF, 0, Z1 - 0.45);
    group.add(far);
    const behind = new THREE.Mesh(new THREE.PlaneGeometry(CW, CH), darkMat);
    behind.position.set(0, CH / 2, Z1 - 0.7);
    group.add(behind);

    // torches
    const glowTex = canvasTex(makeGlowCanvas(128), true);
    for (let i = 0; i <= BAYS; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = Z0 - i * BAYW + BAYW / 2;
      if (z > Z0 - 0.4 || z < Z1 + 1) continue;

      const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 6), metalMat);
      bracket.rotation.z = Math.PI / 2;
      bracket.position.set(side * (HALF - 0.15), 2.62, z);
      group.add(bracket);
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.055, 0.15, 8), metalMat);
      cup.position.set(side * (HALF - 0.28), 2.72, z);
      group.add(cup);

      const flame = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: 0xffb060,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          toneMapped: false,
        })
      );
      flame.scale.set(0.5, 0.72, 1);
      flame.position.set(side * (HALF - 0.28), 2.86, z);
      group.add(flame);

      this.flames.push({ sprite: flame, phase: i * 1.7, x: side * (HALF - 0.4), y: 2.86, z, ly: 2.86 });
    }

    // distant torch inside the doorway
    const dlight = new THREE.PointLight(0xff9d55, 6, 6.5, 2);
    dlight.position.set(0, 2.0, Z1 + 0.4);
    group.add(dlight);

    // skylight illumination
    const skyLight = new THREE.PointLight(0xbcd4ff, 34, 20, 2);
    skyLight.position.set(0, CH + 2.6, SKY_Z);
    group.add(skyLight);
    const skyDir = new THREE.DirectionalLight(0x9fbcff, 1.5);
    skyDir.position.set(1.2, 12, 2);
    skyDir.target.position.set(0, 0, SKY_Z);
    group.add(skyDir);
    group.add(skyDir.target);

    this.scene.add(new THREE.AmbientLight(0x243040, 0.6));
    this.scene.add(new THREE.HemisphereLight(0x2b3a52, 0x07060a, 0.3));

    // drifting dust motes
    const N = 500;
    const dp = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      dp[i * 3] = (Math.random() - 0.5) * CW * 0.95;
      dp[i * 3 + 1] = 0.2 + Math.random() * (CH - 0.6);
      dp[i * 3 + 2] = Z1 + Math.random() * CLEN;
    }
    this.dustPos = dp;
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    const dustMesh = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        map: canvasTex(makeDustCanvas(32), true),
        color: 0xffe4b0,
        size: 0.028,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        toneMapped: false,
      })
    );
    this.dust = dustMesh;
    this.scene.add(dustMesh);
  }

  /** Build an entire floor from a tile grid: floor, ceiling, walls, lights, dust. */
  private buildGrid(d: Dungeon): void {
    const CS = this.gcs;
    const HH = 4.8;
    const isWall = (x: number, y: number): boolean =>
      x < 0 || y < 0 || x >= d.w || y >= d.h || d.tiles[y * d.w + x] === TILE_WALL;

    const wallMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, CS / 2.4, HH / 2.4),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, CS / 2.4, HH / 2.4),
      roughnessMap: phTex("rustic_stone_wall_Rough.jpg", false, CS / 2.4, HH / 2.4),
      aoMap: phTex("rustic_stone_wall_AO.jpg", false, CS / 2.4, HH / 2.4),
      aoMapIntensity: 1.1,
      roughness: 1.0,
      metalness: 0.0,
      color: 0xc6cdd6,
    });
    const floorMat = new THREE.MeshStandardMaterial({
      map: phTex("cobblestone_floor_08_Diffuse.jpg", true, CS / 2.4, CS / 2.4),
      normalMap: phTex("cobblestone_floor_08_nor_gl.jpg", false, CS / 2.4, CS / 2.4),
      roughnessMap: phTex("cobblestone_floor_08_Rough.jpg", false, CS / 2.4, CS / 2.4),
      aoMap: phTex("cobblestone_floor_08_AO.jpg", false, CS / 2.4, CS / 2.4),
      aoMapIntensity: 1.0,
      roughness: 1.0,
      metalness: 0.0,
    });
    const ceilMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, CS / 2.4, CS / 2.4),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, CS / 2.4, CS / 2.4),
      roughness: 1.0,
      metalness: 0.0,
      color: 0x6e6a60,
    });

    const wallGeos: THREE.BufferGeometry[] = [];
    const floorGeos: THREE.BufferGeometry[] = [];
    const ceilGeos: THREE.BufferGeometry[] = [];
    const skySet = new Set((d.sky ?? []).map((s) => s.y * d.w + s.x));

    for (let gy = 0; gy < d.h; gy++) {
      for (let gx = 0; gx < d.w; gx++) {
        if (isWall(gx, gy)) continue;
        const cx = gx * CS;
        const cz = gy * CS;
        floorGeos.push(new THREE.PlaneGeometry(CS, CS).rotateX(-Math.PI / 2).translate(cx, 0, cz));
        if (!skySet.has(gy * d.w + gx)) {
          ceilGeos.push(new THREE.PlaneGeometry(CS, CS).rotateX(Math.PI / 2).translate(cx, HH, cz));
        }
        const dirs: [number, number][] = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ];
        for (const [dx, dy] of dirs) {
          if (!isWall(gx + dx, gy + dy)) continue;
          const w = new THREE.PlaneGeometry(CS, HH);
          if (dx === 1) w.rotateY(-Math.PI / 2);
          else if (dx === -1) w.rotateY(Math.PI / 2);
          else if (dy === 1) w.rotateY(Math.PI);
          w.translate(cx + (dx * CS) / 2, HH / 2, cz + (dy * CS) / 2);
          wallGeos.push(w);
        }
      }
    }

    const group = new THREE.Group();
    const addMerged = (geos: THREE.BufferGeometry[], mat: THREE.Material): void => {
      if (!geos.length) return;
      const merged = mergeGeometries(geos, false);
      if (!merged) return;
      const uv = merged.getAttribute("uv");
      if (uv && !merged.getAttribute("uv1")) merged.setAttribute("uv1", uv);
      group.add(new THREE.Mesh(merged, mat));
    };
    addMerged(floorGeos, floorMat);
    addMerged(ceilGeos, ceilMat);
    addMerged(wallGeos, wallMat);
    this.scene.add(group);

    // transverse stone arches over straight corridor cells
    const ribGeo = new THREE.TorusGeometry(CS / 2, 0.14, 8, 20, Math.PI);
    const ribMat = new THREE.MeshStandardMaterial({
      map: phTex("rustic_stone_wall_Diffuse.jpg", true, 0.8, 0.8),
      normalMap: phTex("rustic_stone_wall_nor_gl.jpg", false, 0.8, 0.8),
      roughness: 1.0,
      metalness: 0.0,
      color: 0xbdb6a8,
    });
    const ribCells: { x: number; z: number; rot: number }[] = [];
    const torchCell = new Set<number>();
    for (const L of d.lights ?? []) torchCell.add(L.y * d.w + L.x);
    for (let gy = 0; gy < d.h; gy++) {
      for (let gx = 0; gx < d.w; gx++) {
        if (isWall(gx, gy)) continue;
        const n = !isWall(gx, gy - 1);
        const s2 = !isWall(gx, gy + 1);
        const e = !isWall(gx + 1, gy);
        const w = !isWall(gx - 1, gy);
        const i = gy * d.w + gx;
        if (n && s2 && !(e && w) && torchCell.has(i)) {
          ribCells.push({ x: gx * CS, z: gy * CS, rot: 0 });
        } else if (e && w && !(n && s2) && torchCell.has(i)) {
          ribCells.push({ x: gx * CS, z: gy * CS, rot: Math.PI / 2 });
        }
      }
    }
    if (ribCells.length) {
      const inst = new THREE.InstancedMesh(ribGeo, ribMat, ribCells.length);
      const mat = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const eu = new THREE.Euler();
      const p = new THREE.Vector3();
      const sc = new THREE.Vector3(1, 1, 1.8);
      ribCells.forEach((c, i) => {
        eu.set(0, c.rot, 0);
        q.setFromEuler(eu);
        p.set(c.x, HH - CS / 2, c.z);
        mat.compose(p, q, sc);
        inst.setMatrixAt(i, mat);
      });
      inst.instanceMatrix.needsUpdate = true;
      group.add(inst);
    }

    // skylights cut into the ceiling
    for (const s of d.sky ?? []) {
      const cx = s.x * CS;
      const cz = s.y * CS;
      const cap = new THREE.Mesh(
        new THREE.PlaneGeometry(CS, CS),
        new THREE.MeshBasicMaterial({ map: canvasTex(makeSkyCanvas(128), true), toneMapped: false })
      );
      cap.rotation.x = Math.PI / 2;
      cap.position.set(cx, HH + 0.9, cz);
      group.add(cap);
      const l = new THREE.PointLight(0xbcd4ff, 30, 18, 2);
      l.position.set(cx, HH + 0.4, cz);
      group.add(l);
    }

    // burning wall braziers (protruding from the masonry, not set into it)
    const glowTex = canvasTex(makeGlowCanvas(128), true);
    let ti = 0;
    for (const L of d.lights ?? []) {
      const faceX = L.x * CS + L.dx * (CS / 2 - 0.02);
      const faceZ = L.y * CS + L.dy * (CS / 2 - 0.02);
      const b = makeBrazier();
      b.position.set(faceX, 1.72, faceZ);
      b.rotation.y = Math.atan2(L.dx, L.dy);
      const fd = b.userData.flame as { x: number; y: number; z: number };
      const flame = fireSprite(glowTex);
      flame.position.set(fd.x, fd.y, fd.z);
      b.add(flame);
      group.add(b);
      const wp = new THREE.Vector3();
      b.updateMatrixWorld(true);
      flame.getWorldPosition(wp);
      this.flames.push({ sprite: flame, phase: ti * 1.7, x: wp.x, y: wp.y, z: wp.z, ly: fd.y });
      ti++;
    }

    // chests, keys, barred gates, doors
    const chestMat = new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.7, metalness: 0.1 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.35, metalness: 0.9 });
    const cellIdx = (gx: number, gy: number): number => gy * d.w + gx;
    const blocked = (gx: number, gy: number): boolean =>
      gx < 0 || gy < 0 || gx >= d.w || gy >= d.h || isSolid(d.tiles[cellIdx(gx, gy)]);
    const passageRot = (gx: number, gy: number): number => {
      const openNS = !blocked(gx, gy - 1) || !blocked(gx, gy + 1);
      const openEW = !blocked(gx + 1, gy) || !blocked(gx - 1, gy);
      if (openNS && !openEW) return 0;
      if (openEW && !openNS) return Math.PI / 2;
      return 0;
    };

    const ratSpots: { x: number; z: number }[] = [];
    for (let gy = 0; gy < d.h; gy++) {
      for (let gx = 0; gx < d.w; gx++) {
        const t = d.tiles[cellIdx(gx, gy)];
        const cx = gx * CS;
        const cz = gy * CS;
        if (t === TILE_CHEST) {
          const g = new THREE.Group();
          const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.55), chestMat);
          body.position.y = 0.25;
          g.add(body);
          const lid = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.18, 0.6), chestMat);
          lid.position.y = 0.56;
          g.add(lid);
          for (const zz of [-0.16, 0.16]) {
            const band = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.54, 0.06), trimMat);
            band.position.set(0, 0.28, zz);
            g.add(band);
          }
          g.rotation.y = (gx * 1.7 + gy * 2.3) % Math.PI;
          g.position.set(cx, 0, cz);
          group.add(g);
          this.props.push({ obj: g, gx, gy, type: "chest" });
        } else if (t === TILE_STAIRS) {
          const g = makeStairwell();
          g.position.set(cx, 0, cz);
          group.add(g);
          this.props.push({ obj: g, gx, gy, type: "stairs" });
        } else if (t === TILE_KEY) {
          const g = makeKey();
          g.position.set(cx, 0.9, cz);
          group.add(g);
          this.props.push({ obj: g, gx, gy, type: "key" });
        } else if (t === TILE_BARS) {
          const g = makeBars(CS - 0.1);
          g.position.set(cx, 0, cz);
          g.rotation.y = passageRot(gx, gy);
          group.add(g);
        } else if (t === TILE_DOOR) {
          const g = makeDoor();
          g.position.set(cx, 0, cz);
          g.rotation.y = passageRot(gx, gy);
          group.add(g);
          this.doorMeshes.set(cellIdx(gx, gy), g);
        } else if (t === TILE_VAULT) {
          const g = makeVaultDoor();
          g.position.set(cx, 0, cz);
          g.rotation.y = passageRot(gx, gy);
          group.add(g);
          this.doorMeshes.set(cellIdx(gx, gy), g);
        } else if (t === TILE_EXIT) {
          const g = makeExitGate();
          g.position.set(cx, 0, cz);
          g.rotation.y = Math.atan2(d.start.x - gx, d.start.y - gy);
          group.add(g);
          this.exitCell = [gx, gy];
        }
      }
    }

    // decorative props
    for (const dc of d.decor ?? []) {
      const cx = dc.x * CS;
      const cz = dc.y * CS;
      if (dc.kind === "fountain") {
        const g = makeFountain();
        g.position.set(cx, 0, cz);
        group.add(g);
        this.blocks.add(cellIdx(dc.x, dc.y));
      } else if (dc.kind === "table") {
        const g = makeTable();
        g.position.set(cx, 0, cz);
        g.rotation.y = (dc.x * 1.3 + dc.y) % Math.PI;
        group.add(g);
        this.blocks.add(cellIdx(dc.x, dc.y));
      } else if (dc.kind === "gargoyle") {
        const kit = gargoyleModel(dc.x * 3 + dc.y);
        if (kit) {
          kit.scale.setScalar(0.66);
          kit.position.set(cx, 0, cz);
          kit.rotation.y = Math.atan2(-dc.y + d.h / 2, -dc.x + d.w / 2);
          group.add(kit);
        } else {
          const g = makeGargoyle();
          g.position.set(cx, 0, cz);
          g.rotation.y = Math.atan2(-dc.y + d.h / 2, -dc.x + d.w / 2);
          group.add(g);
        }
        this.blocks.add(cellIdx(dc.x, dc.y));
      } else if (dc.kind === "skeleton") {
        const g = makeSkeleton();
        g.position.set(cx, 0, cz);
        g.rotation.y = (dc.x * 2.1 + dc.y * 3.7) % (Math.PI * 2);
        group.add(g);
      } else if (dc.kind === "map") {
        const fx = dc.x * CS + dc.dx * (CS / 2 - 0.05);
        const fz = dc.y * CS + dc.dy * (CS / 2 - 0.05);
        const g = makeWallMap();
        g.position.set(fx, 2.1, fz);
        g.rotation.y = Math.atan2(dc.dx, dc.dy);
        group.add(g);
      } else if (dc.kind === "grate") {
        const fx = dc.x * CS + dc.dx * (CS / 2 - 0.06);
        const fz = dc.y * CS + dc.dy * (CS / 2 - 0.06);
        const g = makeGrate();
        g.position.set(fx, 2.3, fz);
        g.rotation.y = Math.atan2(dc.dx, dc.dy);
        group.add(g);
      } else if (dc.kind === "rat") {
        ratSpots.push({ x: cx, z: cz });
      } else if (dc.kind === "urn" || dc.kind === "barrel") {
        const g = dc.kind === "urn" ? makeUrn() : makeBarrel();
        g.position.set(cx, 0, cz);
        g.rotation.y = (dc.x * 0.7 + dc.y * 1.9) % Math.PI;
        group.add(g);
        this.blocks.add(cellIdx(dc.x, dc.y));
      } else if (dc.kind === "web") {
        const g = makeCobweb();
        g.position.set(cx, 0, cz);
        g.rotation.y = (dc.x + dc.y) % Math.PI;
        group.add(g);
      } else if (dc.kind === "chain") {
        const g = makeChains();
        g.position.set(cx, 0, cz);
        group.add(g);
      }
    }

    for (const spot of ratSpots) {
      const g = makeRat();
      const dir = Math.random() * Math.PI * 2;
      g.position.set(spot.x, 0, spot.z);
      g.rotation.y = dir;
      group.add(g);
      this.rats.push({
        obj: g,
        hx: spot.x,
        hz: spot.z,
        tx: spot.x,
        tz: spot.z,
        speed: 0.9 + Math.random() * 0.7,
        phase: Math.random() * 10,
      });
    }

    this.scene.add(new THREE.AmbientLight(0x243040, 0.6));
    this.scene.add(new THREE.HemisphereLight(0x2b3a52, 0x07060a, 0.3));

    const N = 600;
    const dp = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      dp[i * 3] = Math.random() * d.w * CS;
      dp[i * 3 + 1] = 0.2 + Math.random() * 4.0;
      dp[i * 3 + 2] = Math.random() * d.h * CS;
    }
    this.dustPos = dp;
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    this.dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        map: canvasTex(makeDustCanvas(32), true),
        color: 0xffe4b0,
        size: 0.03,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        toneMapped: false,
      })
    );
    this.scene.add(this.dust);
  }

  private canStand(px: number, pz: number): boolean {
    const d = this.grid;
    if (!d) return true;
    const r = this.radius;
    const offs: [number, number][] = [
      [0, 0],
      [-r, -r],
      [r, -r],
      [-r, r],
      [r, r],
      [-r, 0],
      [r, 0],
      [0, -r],
      [0, r],
    ];
    for (const [ox, oz] of offs) {
      const gx = Math.round((px + ox) / this.gcs);
      const gy = Math.round((pz + oz) / this.gcs);
      if (gx < 0 || gy < 0 || gx >= d.w || gy >= d.h) return false;
      const i = gy * d.w + gx;
      if (isSolid(d.tiles[i]) || this.blocks.has(i)) return false;
    }
    return true;
  }

  layout(uiCanvas: HTMLCanvasElement, rectBox = { x: 0, y: 0, w: 384, h: 216 }): void {
    const r = uiCanvas.getBoundingClientRect();
    const sx = r.width / 384;
    const sy = r.height / 216;
    const left = r.left + rectBox.x * sx;
    const top = r.top + rectBox.y * sy;
    const w = rectBox.w * sx;
    const h = rectBox.h * sy;
    const style = this.canvas.style;
    style.left = `${left}px`;
    style.top = `${top}px`;
    style.width = `${w}px`;
    style.height = `${h}px`;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    if (w !== this.lastW || h !== this.lastH) {
      this.lastW = w;
      this.lastH = h;
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(w, h, false);
      this.composer.setPixelRatio(dpr);
      this.composer.setSize(w, h);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  update(dt: number, input: Input): number {
    this.t += dt;
    const STEP_DUR = 0.24;
    const TURN_DUR = 0.16;
    let moved = 0;

    if (this.turnTween) {
      this.turnTween.t += dt;
      const k = Math.min(1, this.turnTween.t / this.turnTween.dur);
      const e = k * k * (3 - 2 * k);
      this.yaw = this.turnTween.from + (this.turnTween.to - this.turnTween.from) * e;
      if (k >= 1) {
        this.yaw = this.turnTween.to;
        this.turnTween = null;
      }
    } else if (this.stepTween) {
      this.stepTween.t += dt;
      const k = Math.min(1, this.stepTween.t / this.stepTween.dur);
      const e = k * k * (3 - 2 * k);
      this.pos.x = this.stepTween.fx + (this.stepTween.tx - this.stepTween.fx) * e;
      this.pos.z = this.stepTween.fz + (this.stepTween.tz - this.stepTween.fz) * e;
      if (k >= 1) {
        this.pos.x = this.stepTween.tx;
        this.pos.z = this.stepTween.tz;
        this.stepTween = null;
        moved = this.gcs;
      }
    } else if (input.held("left")) {
      this.turnTween = { from: this.yaw, to: this.yaw + Math.PI / 2, t: 0, dur: TURN_DUR };
    } else if (input.held("right")) {
      this.turnTween = { from: this.yaw, to: this.yaw - Math.PI / 2, t: 0, dur: TURN_DUR };
    } else {
      const dir = input.held("up") ? 1 : input.held("down") ? -1 : 0;
      if (dir !== 0) {
        const fx = -Math.sin(this.yaw);
        const fz = -Math.cos(this.yaw);
        const tx = this.pos.x + fx * this.gcs * dir;
        const tz = this.pos.z + fz * this.gcs * dir;
        if (!this.grid || this.canStand(tx, tz)) {
          this.stepTween = { fx: this.pos.x, fz: this.pos.z, tx, tz, t: 0, dur: STEP_DUR };
        }
      }
    }

    const bob = this.stepTween ? 0.03 * Math.sin(Math.min(1, this.stepTween.t / this.stepTween.dur) * Math.PI) : 0;
    if (!this.grid) {
      const lx = HALF - 0.55;
      this.pos.x = Math.max(-lx, Math.min(lx, this.pos.x));
      this.pos.z = Math.max(Z1 + 1.4, Math.min(Z0 - 0.6, this.pos.z));
    }
    this.camera.position.set(this.pos.x, 1.62 + bob, this.pos.z);
    this.camera.rotation.set(0, this.yaw, 0);

    const camx = this.pos.x;
    const camz = this.pos.z;
    const nearest = this.flames
      .map((f, idx) => ({ f, idx, d2: (f.x - camx) ** 2 + (f.z - camz) ** 2 }))
      .sort((a, b) => a.d2 - b.d2);
    for (let i = 0; i < this.lightPool.length; i++) {
      const l = this.lightPool[i];
      if (i < nearest.length) {
        const f = nearest[i].f;
        const fl = 0.78 + 0.22 * Math.sin(this.t * 15 + f.phase) + 0.1 * Math.sin(this.t * 37 + f.phase * 2.1);
        l.position.set(f.x, f.y, f.z);
        l.intensity = 12 * fl;
      } else {
        l.intensity = 0;
      }
    }
    for (const f of this.flames) {
      const fl = 0.78 + 0.22 * Math.sin(this.t * 15 + f.phase) + 0.1 * Math.sin(this.t * 37 + f.phase * 2.1);
      const s = 0.38 + 0.07 * fl;
      f.sprite.scale.set(s, s * 1.45, 1);
      f.sprite.position.y = f.ly + 0.02 * Math.sin(this.t * 21 + f.phase);
      f.sprite.visible = (f.x - camx) ** 2 + (f.z - camz) ** 2 < 900;
    }

    if (this.dustPos && this.dust) {
      const p = this.dustPos;
      for (let i = 0; i < p.length; i += 3) {
        p[i + 1] += dt * 0.035 * (0.5 + (i % 7) / 7);
        p[i] += dt * 0.02 * Math.sin(this.t * 0.4 + i);
        if (p[i + 1] > CH - 0.3) p[i + 1] = 0.25;
      }
      (this.dust.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    }

    if (this.shaft) {
      const m = this.shaft.material as THREE.MeshBasicMaterial;
      m.opacity = 0.022 + 0.012 * (0.5 + 0.5 * Math.sin(this.t * 0.7));
    }

    if (this.playerLight) this.playerLight.position.set(camx, 1.95, camz);
    this.updateRats(dt);
    return moved;
  }

  private walkableCell(gx: number, gy: number): boolean {
    const d = this.grid;
    if (!d) return false;
    if (gx < 0 || gy < 0 || gx >= d.w || gy >= d.h) return false;
    const i = gy * d.w + gx;
    return !isSolid(d.tiles[i]) && !this.blocks.has(i);
  }

  private updateRats(dt: number): void {
    const px = this.pos.x;
    const pz = this.pos.z;
    for (const r of this.rats) {
      const pdx = r.obj.position.x - px;
      const pdz = r.obj.position.z - pz;
      const near = Math.hypot(pdx, pdz) < 3.2;
      if (near) {
        r.tx = r.obj.position.x + pdx * 2;
        r.tz = r.obj.position.z + pdz * 2;
      }
      const dx = r.tx - r.obj.position.x;
      const dz = r.tz - r.obj.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.12) {
        for (let t = 0; t < 8; t++) {
          const gx = Math.round(r.hx / this.gcs) + ((Math.random() * 5) | 0) - 2;
          const gy = Math.round(r.hz / this.gcs) + ((Math.random() * 5) | 0) - 2;
          if (this.walkableCell(gx, gy)) {
            r.tx = gx * this.gcs;
            r.tz = gy * this.gcs;
            break;
          }
        }
      } else {
        const step = Math.min(dist, r.speed * (near ? 2.1 : 1) * dt);
        r.obj.position.x += (dx / dist) * step;
        r.obj.position.z += (dz / dist) * step;
        const want = Math.atan2(dx, dz);
        let diff = want - r.obj.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        r.obj.rotation.y += diff * Math.min(1, dt * 8);
      }
      r.obj.position.y = 0.03 * Math.abs(Math.sin(this.t * 12 + r.phase));
    }
  }

  unlock(gx: number, gy: number): boolean {
    const d = this.grid;
    if (!d) return false;
    const i = gy * d.w + gx;
    if (d.tiles[i] !== TILE_DOOR && d.tiles[i] !== TILE_VAULT) return false;
    d.tiles[i] = 0;
    const mesh = this.doorMeshes.get(i);
    if (mesh) {
      mesh.parent?.remove(mesh);
      this.doorMeshes.delete(i);
    }
    return true;
  }

  doorNeighbor(): [number, number] | null {
    const d = this.grid;
    if (!d) return null;
    const [gx, gy] = this.cell();
    for (const v of DIR_VEC) {
      const nx = gx + v.x;
      const ny = gy + v.y;
      if (nx < 0 || ny < 0 || nx >= d.w || ny >= d.h) continue;
      if (d.tiles[ny * d.w + nx] === TILE_DOOR || d.tiles[ny * d.w + nx] === TILE_VAULT) return [nx, ny];
    }
    return null;
  }

  heading(): number {
    const d = Math.round(this.yaw / (Math.PI / 2));
    return ((-d % 4) + 4) % 4;
  }

  render(): void {
    if (!this.ready) return;
    this.composer.render();
  }
}

/* ------------------------------------------------------------------ */
/* Scene wrapper                                                       */
/* ------------------------------------------------------------------ */

export class HallScene implements Scene {
  private hall: Hall3D | null = null;
  private dist = 0;
  private nextDist = 24 + Math.random() * 32;
  private floor = 1;
  private seen: Uint8Array | null = null;
  private showMap = false;
  private enemies = true;
  private keys = 0;
  private revealAll = false;
  private lockedMsg = "";
  private world: "dungeon" | "map" | "town" = "dungeon";
  private map: World | null = null;
  private mapMarker = 0;
  private lastCell = "";
  private town: Dungeon | null = null;
  private msg: string[] = ["The Sunken Vault — B1. The air is cold and still."];

  constructor(private host: Host, private dungeon?: Dungeon) {
    const q = new URLSearchParams(location.search);
    if (q.get("map") === "1") this.showMap = true;
    this.revealAll = q.get("plan") === "1";
    if (q.get("scene") === "world") this.world = "map";
    if (q.get("scene") === "town") {
      this.world = "town";
      this.town = generateTown(Number(q.get("seed") ?? 12345));
      this.msg = ["Market Town."];
    }
  }

  glRender(viewEl: HTMLCanvasElement, uiCanvas: HTMLCanvasElement): void {
    if (this.world === "map") return;
    if (!this.hall) {
      try {
        this.hall = new Hall3D(viewEl, this.dungeon);
        if (this.world === "town" && this.town) this.hall.loadTown(this.town);
      } catch (err) {
        document.title = "HALLERR " + (err as Error).message;
        this.hall = null;
        return;
      }
    }
    if (this.showMap) return;
    this.hall.layout(uiCanvas, VIEW);
    this.hall.render();
  }

  update(dt: number, input: Input): void {
    if (this.world === "map") {
      this.updateMap(input);
      return;
    }

    if (input.justPressed("map")) this.showMap = !this.showMap;
    if (input.justPressed("enemies")) {
      this.enemies = !this.enemies;
      this.msg = [this.enemies ? "Wandering foes stir again." : "The halls lie quiet — no foes."];
    }

    if (this.dungeon && !this.seen) this.seen = new Uint8Array(this.dungeon.w * this.dungeon.h);
    if (this.seen && this.revealAll) this.seen.fill(1);
    if (this.showMap) {
      this.markSeen();
      return;
    }

    const moved = this.hall?.update(dt, input) ?? 0;
    const inTown = this.hall?.isTown() ?? false;
    if (moved > 0 && !inTown) {
      this.markSeen();
      this.dist += moved;
      if (this.dist >= this.nextDist) {
        this.dist = 0;
        this.nextDist = 24 + Math.random() * 32;
        if (this.enemies) {
          void this.startEncounter();
          return;
        }
      }
    }
    if (this.hall) {
      const [gx, gy] = this.hall.cell();
      const cellKey = gx + "," + gy;
      const ex = this.hall.exit();
      if (cellKey !== this.lastCell) {
        this.lastCell = cellKey;
        if (ex && ex[0] === gx && ex[1] === gy) {
          this.enterMap(inTown ? 1 : 0);
          return;
        }
        if (inTown && input.justPressed("confirm")) {
          this.townInteract(gx, gy);
        }
        if (!inTown) {
          const what = this.hall.takeAt(gx, gy);
          if (what === "chest") this.msg = [this.loot()];
          else if (what === "stairs") {
            this.descend();
            return;
          } else if (what === "key") {
            this.keys++;
            this.msg = [`A cold iron key.  (keys ${this.keys})`];
          }
        }
      }
      if (inTown && input.justPressed("confirm")) this.townInteract(gx, gy);
      if (inTown) return;
      const door = this.hall.doorNeighbor();
      if (door) {
        const id = door[0] + "," + door[1];
        if (this.keys > 0) {
          if (this.hall.unlock(door[0], door[1])) {
            this.keys--;
            this.msg = ["The iron door groans open."];
            this.lockedMsg = "";
          }
        } else if (this.lockedMsg !== id) {
          this.msg = ["The way is barred — a key is needed."];
          this.lockedMsg = id;
        }
      }
    }
  }

  private markSeen(): void {
    if (!this.hall || !this.dungeon || !this.seen) return;
    const [gx, gy] = this.hall.cell();
    const R = 4;
    for (let y = gy - R; y <= gy + R; y++) {
      for (let x = gx - R; x <= gx + R; x++) {
        if (x < 0 || y < 0 || x >= this.dungeon.w || y >= this.dungeon.h) continue;
        if ((x - gx) * (x - gx) + (y - gy) * (y - gy) > R * R + 3) continue;
        this.seen[y * this.dungeon.w + x] = 1;
      }
    }
  }

  private loot(): string {
    const roll = Math.random();
    if (roll < 0.6) {
      const g = 15 + ((Math.random() * 45) | 0);
      this.host.gold += g;
      return `A chest — ${g} gold glitters inside.`;
    }
    if (roll < 0.86) {
      this.host.inventory.potion = (this.host.inventory.potion ?? 0) + 1;
      return "A flask of amber draught.";
    }
    const m = this.host.party[(Math.random() * this.host.party.length) | 0];
    m.atk += 1;
    return `${m.name} finds an ember shard (+1 ATK).`;
  }

  private descend(): void {
    this.floor++;
    const d = generateDungeon((Math.random() * 1e9) | 0);
    this.dungeon = d;
    this.seen = new Uint8Array(d.w * d.h);
    this.lockedMsg = "";
    this.hall?.reset(d);
    this.markSeen();
    this.dist = 0;
    this.msg = [`You descend the stair to B${this.floor}. The dark grows hungrier.`];
  }

  private async startEncounter(): Promise<void> {
    const size = Math.min(4, 2 + Math.floor((this.floor - 1) / 2) + (Math.random() < 0.3 ? 1 : 0));
    const monsters = rollEncounter((Math.random() * 1e9) | 0, size);
    const { BattleScene } = await import("./scenes");
    const scene = new BattleScene(this.host, monsters, (result) => {
      if (result === "win") {
        this.msg = ["The corridor falls silent again."];
      } else {
        this.msg = ["You wake at the vault mouth, bruised."];
        for (const m of this.host.party) m.hp = Math.max(1, Math.floor(m.maxHp / 2));
      }
      this.host.setScene(this);
    });
    this.msg = [`${monsters.length} cards are dealt!`];
    this.host.setScene(scene);
  }

  private enterMap(marker = 0): void {
    this.world = "map";
    this.mapMarker = marker;
    this.map = generateWorld((Math.random() * 1e9) | 0);
    this.msg = ["You step back out under open sky."];
  }

  private enterTown(): void {
    const town = generateTown((Math.random() * 1e9) | 0);
    this.world = "town";
    this.lastCell = "";
    this.showMap = false;
    if (this.hall) this.hall.loadTown(town);
    else this.town = town;
    this.msg = [`${town.name}: stalls, an inn, a smith and a mage.  [Z] to use.`];
  }

  private townInteract(gx: number, gy: number): void {
    const shop = this.hall?.nearestShop(gx, gy);
    if (!shop) return;
    if (shop.kind === "inn") {
      if (this.host.gold >= 10) {
        this.host.gold -= 10;
        for (const m of this.host.party) {
          m.hp = m.maxHp;
          m.mp = m.maxMp;
        }
        this.msg = ["You rest by the hearth. The party is fully restored."];
      } else {
        this.msg = ["The innkeeper wants 10 gold for a night's rest."];
      }
    } else if (shop.kind === "blacksmith") {
      const m = this.host.party[0];
      if (this.host.gold >= 25) {
        this.host.gold -= 25;
        m.atk += 1;
        this.msg = [`The smith tempers ${m.name}'s blade.  (ATK ${m.atk})`];
      } else {
        this.msg = ["The smith charges 25 gold to improve a weapon."];
      }
    } else if (shop.kind === "magician") {
      const known = new Set(this.host.party.flatMap((m) => m.spells));
      const all = Object.keys(SPELLS);
      const next = all.find((s) => !known.has(s));
      if (!next) {
        this.msg = ["The mage has taught you all she knows."];
      } else if (this.host.gold >= 40) {
        this.host.gold -= 40;
        const pupil = this.host.party.reduce((a, b) => (a.spells.length <= b.spells.length ? a : b));
        pupil.spells.push(next);
        this.msg = [`The mage teaches ${pupil.name} ${SPELLS[next].name}.`];
      } else {
        this.msg = ["The mage asks 40 gold to teach a new spell."];
      }
    } else if (shop.kind === "stall") {
      if (this.host.gold >= 12) {
        this.host.gold -= 12;
        this.host.inventory.potion = (this.host.inventory.potion ?? 0) + 1;
        this.msg = ["A merchant sells you an amber draught."];
      } else {
        this.msg = ["The merchant wants 12 gold for a draught."];
      }
    } else if (shop.kind === "well") {
      for (const m of this.host.party) m.hp = Math.min(m.maxHp, m.hp + 6);
      this.msg = ["You draw from the fountain and drink. (+6 HP each)"];
    }
  }

  private updateMap(input: Input): void {
    if (!this.map) this.map = generateWorld((Math.random() * 1e9) | 0);
    if (input.justPressed("left")) this.mapMarker = Math.max(0, this.mapMarker - 1);
    if (input.justPressed("right")) this.mapMarker = Math.min(this.map.nodes.length - 1, this.mapMarker + 1);
    if (input.justPressed("confirm")) {
      const n = this.map.nodes[this.mapMarker];
      if (n.kind === "dungeon") {
        const d = this.dungeon ?? generateDungeon((Math.random() * 1e9) | 0);
        this.dungeon = d;
        this.world = "dungeon";
        this.lastCell = "";
        if (this.hall) this.hall.reset(d);
        this.msg = ["You descend once more into the vault."];
      } else {
        this.enterTown();
      }
    }
  }

  private drawMapView(ctx: CanvasRenderingContext2D): void {
    if (!this.map) this.map = generateWorld(1);
    drawWorld(ctx, this.map, this.mapMarker, performance.now() / 1000, 384, 216);
    rect(ctx, 0, 0, 384, 16, "rgba(8,8,14,0.82)");
    text(ctx, this.msg[0] ?? "", 6, 4, C.text, 8);
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.world === "map") {
      this.drawMapView(ctx);
      return;
    }
    rect(ctx, 0, 0, 384, 216, C.bg);
    ctx.clearRect(VIEW.x, VIEW.y, VIEW.w, VIEW.h);

    const inTown = this.hall?.isTown() ?? false;
    if (this.showMap && !inTown && this.dungeon && this.seen && this.hall) {
      const [gx, gy] = this.hall.cell();
      drawAutomap(ctx, this.dungeon, this.seen, gx, gy, this.hall.heading(), VIEW.x, VIEW.y, VIEW.w, VIEW.h);
    }

    rect(ctx, VIEW.x - 2, VIEW.y - 2, VIEW.w + 4, 1, C.gold);
    rect(ctx, VIEW.x - 2, VIEW.y + VIEW.h + 1, VIEW.w + 4, 1, C.gold);
    rect(ctx, VIEW.x - 2, VIEW.y - 2, 1, VIEW.h + 4, C.gold);
    rect(ctx, VIEW.x + VIEW.w + 1, VIEW.y - 2, 1, VIEW.h + 4, C.gold);

    drawMemberCard(ctx, this.host.party[0], 0, 4, PANEL_W, 100, false);
    drawMemberCard(ctx, this.host.party[1], 0, 108, PANEL_W, 100, false);
    drawMemberCard(ctx, this.host.party[2], 308, 4, PANEL_W, 100, false);
    drawMemberCard(ctx, this.host.party[3], 308, 108, PANEL_W, 100, false);

    drawCompass(ctx, this.hall ? this.hall.heading() : 0, 192, 124);
    drawMessage(ctx, VIEW.x, 150, VIEW.w, 62, [
      ...this.msg,
      "",
      inTown ? `Town   Gold ${this.host.gold}` : `B${this.floor}   Gold ${this.host.gold}   Keys ${this.keys}`,
    ]);
    if (inTown) {
      text(ctx, "[Z] talk / use", VIEW.x + 4, 141, C.dim, 8);
    } else {
      text(ctx, this.showMap ? "[M] close map" : "[M] map", VIEW.x + 4, 141, C.dim, 8);
      text(ctx, this.enemies ? "[E] foes: on" : "[E] foes: off", VIEW.x + 74, 141, this.enemies ? C.dim : C.gold, 8);
    }
    text(ctx, VERSION, VIEW.x + VIEW.w - 34, 141, C.dim, 8);
  }
}

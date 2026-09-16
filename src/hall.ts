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
  TILE_KEY,
  TILE_STAIRS,
  TILE_WALL,
  generateDungeon,
  isSolid,
  rollEncounter,
} from "./data";
import { Input, Scene, mulberry32 } from "./engine";
import { C, drawAutomap, drawCompass, drawMemberCard, drawMessage, rect, text } from "./render";
import type { Host } from "./scenes";

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
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.5, 6), iron);
    bar.position.set(-span / 2 + (i / (n - 1)) * span, 1.75, 0);
    g.add(bar);
  }
  for (const y of [0.5, 1.75, 3.0]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(span, 0.07, 0.07), iron);
    rail.position.set(0, y, 0);
    g.add(rail);
  }
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

/** Descending stairwell sunk into the floor. */
function makeStairwell(): THREE.Group {
  const g = new THREE.Group();
  const stone = matStone();
  const dark = matDark();
  const depth = 3.2;
  const inner = CW / 2 - 0.2;
  for (const [dx, dz, rot] of [
    [1, 0, -Math.PI / 2],
    [-1, 0, Math.PI / 2],
    [0, 1, Math.PI],
    [0, -1, 0],
  ] as [number, number, number][]) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(CW, depth), stone);
    wall.rotation.y = rot;
    wall.position.set(dx * inner, -depth / 2, dz * inner);
    g.add(wall);
  }
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(CW, CW), dark);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = -depth;
  g.add(bottom);
  for (let i = 0; i < 7; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(CW - 0.4, 0.34, 0.42), stone);
    step.position.set(0, -0.17 - i * 0.4, -1.2 + i * 0.4);
    g.add(step);
  }
  const light = new THREE.PointLight(0x7fa8ff, 5, 9, 2);
  light.position.set(0, -0.6, 0.2);
  g.add(light);
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
  private radius = 0.42;
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
    const pose = new URLSearchParams(location.search).get("pose");
    if (pose && this.grid) {
      const p = pose.split(",").map(Number);
      if (Number.isFinite(p[0]) && Number.isFinite(p[1])) this.pos.set(p[0] * this.gcs, 1.62, p[1] * this.gcs);
      if (Number.isFinite(p[2])) this.yaw = DIR_YAW[((p[2] % 4) + 4) % 4];
    }
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
    for (const child of [...this.scene.children]) this.scene.remove(child);
    this.flames = [];
    this.rats = [];
    this.blocks = new Set();
    this.doorMeshes = new Map();
    this.props = [];
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

  takeAt(gx: number, gy: number): "chest" | "stairs" | "key" | null {
    const idx = this.props.findIndex((p) => p.gx === gx && p.gy === gy);
    if (idx < 0) return null;
    const p = this.props[idx];
    this.scene.remove(p.obj);
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
        const t = d.tiles[gy * d.w + gx];
        if (t !== TILE_STAIRS) {
          floorGeos.push(new THREE.PlaneGeometry(CS, CS).rotateX(-Math.PI / 2).translate(cx, 0, cz));
        }
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
        const g = makeGargoyle();
        g.position.set(cx, 0, cz);
        g.rotation.y = Math.atan2(-dc.y + d.h / 2, -dc.x + d.w / 2);
        group.add(g);
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
    const turn = 2.3;
    const speed = 2.7;
    if (input.held("left")) this.yaw += turn * dt;
    if (input.held("right")) this.yaw -= turn * dt;

    const fx = -Math.sin(this.yaw);
    const fz = -Math.cos(this.yaw);
    let mz = 0;
    if (input.held("up")) mz += 1;
    if (input.held("down")) mz -= 1;
    if (mz !== 0) {
      const nx = this.pos.x + fx * speed * dt * mz;
      const nz = this.pos.z + fz * speed * dt * mz;
      if (this.grid) {
        if (this.canStand(nx, this.pos.z)) this.pos.x = nx;
        if (this.canStand(this.pos.x, nz)) this.pos.z = nz;
      } else {
        this.pos.x = nx;
        this.pos.z = nz;
      }
    }
    const bob = 0.02 * Math.sin(this.t * 9) * (mz !== 0 ? 1 : 0);
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
    return mz !== 0 ? speed * dt : 0;
  }

  private walkableCell(gx: number, gy: number): boolean {
    const d = this.grid;
    if (!d) return false;
    if (gx < 0 || gy < 0 || gx >= d.w || gy >= d.h) return false;
    const i = gy * d.w + gx;
    return !isSolid(d.tiles[i]) && !this.blocks.has(i);
  }

  private updateRats(dt: number): void {
    for (const r of this.rats) {
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
        const step = Math.min(dist, r.speed * dt);
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
    if (d.tiles[i] !== TILE_DOOR) return false;
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
      if (d.tiles[ny * d.w + nx] === TILE_DOOR) return [nx, ny];
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
  private msg: string[] = ["The Sunken Vault — B1. The air is cold and still."];

  constructor(private host: Host, private dungeon?: Dungeon) {
    const q = new URLSearchParams(location.search);
    if (q.get("map") === "1") this.showMap = true;
    this.revealAll = q.get("plan") === "1";
  }

  glRender(viewEl: HTMLCanvasElement, uiCanvas: HTMLCanvasElement): void {
    if (!this.hall) {
      try {
        this.hall = new Hall3D(viewEl, this.dungeon);
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
    if (moved > 0) {
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
      const what = this.hall.takeAt(gx, gy);
      if (what === "chest") this.msg = [this.loot()];
      else if (what === "stairs") {
        this.descend();
        return;
      } else if (what === "key") {
        this.keys++;
        this.msg = [`A cold iron key.  (keys ${this.keys})`];
      }
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

  render(ctx: CanvasRenderingContext2D): void {
    rect(ctx, 0, 0, 384, 216, C.bg);
    ctx.clearRect(VIEW.x, VIEW.y, VIEW.w, VIEW.h);

    if (this.showMap && this.dungeon && this.seen && this.hall) {
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
      `B${this.floor}   Gold ${this.host.gold}   Keys ${this.keys}`,
    ]);
    text(ctx, this.showMap ? "[M] close map" : "[M] map", VIEW.x + 4, 141, C.dim, 8);
    text(ctx, this.enemies ? "[E] foes: on" : "[E] foes: off", VIEW.x + 74, 141, this.enemies ? C.dim : C.gold, 8);
  }
}

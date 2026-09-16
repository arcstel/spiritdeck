import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { Input, Scene, mulberry32 } from "./engine";
import { C, rect, text } from "./render";

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

const PH = "/textures/ph";

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
  light: THREE.PointLight;
  phase: number;
}

export class Hall3D {
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private flames: Flame[] = [];
  private dust: THREE.Points | null = null;
  private dustPos: Float32Array | null = null;
  private shaft: THREE.Mesh | null = null;
  private pos = new THREE.Vector3(0, 1.62, 5.0);
  private yaw = 0;
  private t = 0;
  private ready = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    this.camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.05, 200);
    this.camera.position.copy(this.pos);
    this.scene.fog = new THREE.FogExp2(0x05070c, 0.032);
    this.scene.background = new THREE.Color(0x04050a);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1024, 576), 0.55, 0.55, 0.82);
    this.composer.addPass(bloom);
    this.composer.addPass(new OutputPass());

    this.build();
    this.ready = true;
  }

  private build(): void {
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

      const light = new THREE.PointLight(0xffa860, 9, 6.0, 2);
      light.position.set(side * (HALF - 0.4), 2.86, z);
      group.add(light);
      this.flames.push({ sprite: flame, light, phase: i * 1.7 });
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

    this.scene.add(new THREE.AmbientLight(0x1b2433, 0.45));
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
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(dpr);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(dt: number, input: Input): void {
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
      this.pos.x += fx * speed * dt * mz;
      this.pos.z += fz * speed * dt * mz;
    }
    const lx = HALF - 0.55;
    const bob = 0.02 * Math.sin(this.t * 9) * (mz !== 0 ? 1 : 0);
    this.pos.x = Math.max(-lx, Math.min(lx, this.pos.x));
    this.pos.z = Math.max(Z1 + 1.4, Math.min(Z0 - 0.6, this.pos.z));
    this.camera.position.set(this.pos.x, 1.62 + bob, this.pos.z);
    this.camera.rotation.set(0, this.yaw, 0);

    for (const f of this.flames) {
      const fl = 0.78 + 0.22 * Math.sin(this.t * 15 + f.phase) + 0.1 * Math.sin(this.t * 37 + f.phase * 2.1);
      f.light.intensity = 9 * fl;
      const s = 0.46 + 0.09 * fl;
      f.sprite.scale.set(s, s * 1.45, 1);
      f.sprite.position.y = 2.86 + 0.02 * Math.sin(this.t * 21 + f.phase);
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
  private hint = "W A S D / arrows  walk  ·  turn with left / right";

  glRender(viewEl: HTMLCanvasElement, uiCanvas: HTMLCanvasElement): void {
    if (!this.hall) {
      try {
        this.hall = new Hall3D(viewEl);
      } catch (err) {
        document.title = "HALLERR " + (err as Error).message;
        this.hall = null;
        return;
      }
    }
    this.hall.layout(uiCanvas, { x: 0, y: 0, w: 384, h: 216 });
  }

  update(dt: number, input: Input): void {
    this.hall?.update(dt, input);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.hall?.render();
    rect(ctx, 8, 8, 156, 14, "rgba(8,8,14,0.5)");
    text(ctx, "THE SUNKEN VAULT — B1", 12, 12, C.gold, 8);
    rect(ctx, 8, 196, 210, 13, "rgba(8,8,14,0.5)");
    text(ctx, this.hint, 12, 200, C.dim, 8);
  }
}

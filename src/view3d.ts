import { DIR_VEC, SkyLight, TorchLight } from "./data";
import { H as UI_H, W as UI_W } from "./engine";
import { Tex, computeNormal, makeCeilingTexture, makeFloorTexture, makeWallTexture } from "./textures";

const BASE = import.meta.env.BASE_URL;

export interface ViewMap {
  w: number;
  h: number;
  tiles: Uint8Array;
  lights?: TorchLight[];
  sky?: SkyLight[];
}

export interface ViewState {
  map: ViewMap;
  pos: [number, number];
  dir: number;
  time: number;
}

const MAXL = 16;
const MAXS = 8;

const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
precision highp sampler2DArray;
out vec4 fragColor;

#define MAXL 16
#define MAXS 8

uniform vec2 uRes;
uniform vec2 uPos;
uniform vec2 uDir;
uniform vec2 uPlane;
uniform vec2 uMapSize;
uniform sampler2D uMap;
uniform sampler2DArray uTex;
uniform sampler2DArray uNrm;
uniform sampler2DArray uTile;
uniform sampler2DArray uTileNrm;
uniform sampler2DArray uAO;
uniform float uTime;
uniform float uWallScale;
uniform float uWallV;
uniform float uTileScale;
uniform float uHalfFov;
uniform float uCyl;
uniform int uNumLights;
uniform vec3 uLightPos[MAXL];
uniform vec3 uLightCol[MAXL];
uniform vec4 uLightPar[MAXL];
uniform int uNumSky;
uniform vec2 uSkyCell[MAXS];
uniform int uNumSpr;
uniform vec4 uSpr[MAXL];

float tileAt(vec2 c) {
  if (c.x < 0.0 || c.y < 0.0 || c.x >= uMapSize.x || c.y >= uMapSize.y) return 1.0;
  return texelFetch(uMap, ivec2(c), 0).r;
}

vec3 applyNormal(vec3 N, vec3 T, vec3 nmap) {
  vec3 B = cross(N, T);
  return normalize(T * nmap.x + B * nmap.y + N * nmap.z);
}

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float hash12(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float camX = 2.0 * frag.x / uRes.x - 1.0;
  vec2 ray;
  if (uCyl > 0.5) {
    float theta = camX * uHalfFov;
    float ct = cos(theta), st = sin(theta);
    ray = vec2(uDir.x * ct - uDir.y * st, uDir.x * st + uDir.y * ct);
  } else {
    ray = uDir + uPlane * camX;
  }

  vec2 mapc = floor(uPos);
  vec2 delta = abs(1.0 / ray);
  vec2 stepv = sign(ray);
  vec2 sideDist;
  sideDist.x = (stepv.x > 0.0 ? (mapc.x + 1.0 - uPos.x) : (uPos.x - mapc.x)) * delta.x;
  sideDist.y = (stepv.y > 0.0 ? (mapc.y + 1.0 - uPos.y) : (uPos.y - mapc.y)) * delta.y;

  float side = 0.0;
  bool hit = false;
  for (int i = 0; i < 160; i++) {
    if (sideDist.x < sideDist.y) { sideDist.x += delta.x; mapc.x += stepv.x; side = 0.0; }
    else { sideDist.y += delta.y; mapc.y += stepv.y; side = 1.0; }
    if (tileAt(mapc) > 0.5) { hit = true; break; }
  }

  float perp = (side == 0.0)
    ? (mapc.x - uPos.x + (1.0 - stepv.x) * 0.5) / ray.x
    : (mapc.y - uPos.y + (1.0 - stepv.y) * 0.5) / ray.y;
  perp = max(perp, 1e-4);

  float centerY = uRes.y * 0.5;
  float lineH = uRes.y / perp;
  float wallBottom = centerY - lineH * 0.5;
  float wallTop = centerY + lineH * 0.5;

  vec3 albedo;
  vec3 N;
  vec3 wpos;
  float dist;
  float ao = 1.0;
  bool isSky = false;

  if (hit && frag.y >= wallBottom && frag.y <= wallTop) {
    float v = 1.0 - (frag.y - wallBottom) / lineH;
    float wx = (side == 0.0) ? uPos.y + perp * ray.y : uPos.x + perp * ray.x;
    int layer = int(mod(mapc.x * 7.0 + mapc.y * 13.0, 3.0));
    vec2 uv = vec2(wx * uWallScale, v * uWallV);
    albedo = texture(uTex, vec3(uv, float(layer))).rgb;
    albedo *= 0.86 + 0.24 * hash12(mapc + 0.5);
    albedo *= 0.84 + 0.18 * vnoise(vec2(wx * 0.55, v * 1.7));
    ao = texture(uAO, vec3(uv, float(layer))).r;
    vec3 nrm = texture(uNrm, vec3(uv, float(layer))).rgb * 2.0 - 1.0;
    vec3 baseN = (side == 0.0) ? vec3(-stepv.x, 0.0, 0.0) : vec3(0.0, 0.0, -stepv.y);
    N = applyNormal(baseN, vec3(0.0, 1.0, 0.0), nrm);
    wpos = vec3(uPos.x + ray.x * perp, v, uPos.y + ray.y * perp);
    dist = perp;
  } else {
    bool floorPix = frag.y < centerY;
    float p = floorPix ? (centerY - frag.y) : (frag.y - centerY);
    p = max(p, 0.0001);
    float rowDist = 0.5 * uRes.y / p;
    vec2 world = uPos + ray * rowDist;
    int layer = floorPix ? 0 : 1;
    vec2 uv = world * uTileScale;
    albedo = texture(uTile, vec3(uv, float(layer))).rgb;
    vec3 nrm = texture(uTileNrm, vec3(uv, float(layer))).rgb * 2.0 - 1.0;
    vec3 baseN = floorPix ? vec3(0.0, 1.0, 0.0) : vec3(0.0, -1.0, 0.0);
    N = applyNormal(baseN, vec3(1.0, 0.0, 0.0), nrm);
    wpos = vec3(world.x, floorPix ? 0.0 : 1.0, world.y);
    dist = rowDist;
    if (!floorPix) {
      vec2 cell = floor(world);
      for (int i = 0; i < MAXS; i++) {
        if (i >= uNumSky) break;
        if (distance(cell, uSkyCell[i]) < 0.5) { isSky = true; break; }
      }
    }
  }

  vec3 eye = vec3(uPos.x, 0.5, uPos.y);
  vec3 col = albedo * vec3(0.040, 0.046, 0.066) * (0.35 + 0.65 * ao);

  for (int i = 0; i < MAXL; i++) {
    if (i >= uNumLights) break;
    vec3 lp = uLightPos[i];
    vec4 par = uLightPar[i];
    vec3 lv = lp - wpos;
    float d2 = dot(lv, lv);
    vec3 L = lv * inversesqrt(max(d2, 1e-4));
    float atten = par.y / (1.0 + d2 / (par.x * par.x));
    float fl = 1.0;
    if (par.w < 0.5) {
      fl = 0.80 + 0.16 * sin(uTime * 13.0 + par.z) + 0.07 * sin(uTime * 31.0 + par.z * 1.7);
    } else if (par.w < 1.5) {
      fl = 0.96 + 0.04 * sin(uTime * 1.7 + par.z);
    }
    float ndl = max(dot(N, L), 0.0);
    vec3 lc = uLightCol[i] * fl;
    col += albedo * lc * atten * (0.16 + 0.95 * ndl) * mix(0.78, 1.0, ao);
    vec3 Vl = normalize(eye - wpos);
    vec3 Hv = normalize(L + Vl);
    float spec = pow(max(dot(N, Hv), 0.0), 48.0) * 0.10 * atten;
    col += lc * spec;
  }

  if (isSky) {
    vec2 suv = wpos.xz * 0.16;
    float cl = vnoise(suv * 3.0) * 0.6 + vnoise(suv * 9.0) * 0.4;
    vec3 skyC = mix(vec3(0.30, 0.46, 0.72), vec3(0.68, 0.82, 1.0), cl);
    col += skyC * 2.1;
  }

  for (int i = 0; i < MAXL; i++) {
    if (i >= uNumSpr) break;
    vec4 s = uSpr[i];
    if (s.w <= 0.0) continue;
    if (s.w > dist + 0.18) continue;
    float dd = distance(frag, s.xy) / max(s.z, 1.0);
    if (dd < 1.0) {
      float core = pow(1.0 - dd, 2.2);
      float fl = 0.82 + 0.18 * sin(uTime * 19.0 + float(i) * 2.1);
      vec3 flame = mix(vec3(1.6, 0.55, 0.12), vec3(2.4, 1.6, 0.7), pow(1.0 - dd, 4.0));
      col += flame * core * fl;
    }
  }

  float fog = 1.0 - exp(-dist * 0.10);
  col = mix(col, vec3(0.010, 0.012, 0.020), clamp(fog, 0.0, 1.0));

  col = aces(col * 0.9);
  col = pow(col, vec3(1.0 / 2.2));

  vec2 q = frag / uRes - 0.5;
  float vig = smoothstep(0.88, 0.28, length(q));
  col *= 0.52 + 0.48 * vig;

  col += (hash12(frag) - 0.5) * 0.010;
  fragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error("shader");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) ?? "shader compile failed");
  }
  return s;
}

function uploadArray(gl: WebGL2RenderingContext, layers: Tex[], wrap: number): WebGLTexture {
  const tex = gl.createTexture();
  if (!tex) throw new Error("tex");
  const size = layers[0].w;
  gl.bindTexture(gl.TEXTURE_2D_ARRAY, tex);
  gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA8, size, size, layers.length, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  for (let i = 0; i < layers.length; i++) {
    gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, size, size, 1, gl.RGBA, gl.UNSIGNED_BYTE, layers[i].data);
  }
  gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, wrap);
  const aniso = gl.getExtension("EXT_texture_filter_anisotropic");
  if (aniso) {
    const max = gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D_ARRAY, aniso.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, max));
  }
  return tex;
}

function imageToTex(img: HTMLImageElement, size = 512): Tex {
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const g = cv.getContext("2d");
  if (!g) throw new Error("no ctx");
  g.imageSmoothingEnabled = true;
  g.drawImage(img, 0, 0, img.width, img.height, 0, 0, size, size);
  return { w: size, h: size, data: g.getImageData(0, 0, size, size).data };
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });
}

function whiteLayers(n: number, size: number): Tex[] {
  const out: Tex[] = [];
  for (let k = 0; k < n; k++) {
    const d = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < d.length; i++) d[i] = 255;
    out.push({ w: size, h: size, data: d });
  }
  return out;
}

async function loadFirst(urls: string[]): Promise<HTMLImageElement | null> {
  for (const u of urls) {
    const im = await loadImage(u);
    if (im) return im;
  }
  return null;
}

export class View3D {
  readonly canvas: HTMLCanvasElement;
  ok = false;
  halfFov = 0.98;
  cyl = false;
  private gl: WebGL2RenderingContext | null = null;
  private prog: WebGLProgram | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private wallTex: WebGLTexture | null = null;
  private wallNrm: WebGLTexture | null = null;
  private tileTex: WebGLTexture | null = null;
  private tileNrm: WebGLTexture | null = null;
  private aoTex: WebGLTexture | null = null;
  private mapTex: WebGLTexture | null = null;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private lastMap: ViewMap | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return;
    this.gl = gl;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog) ?? "link failed");
    }
    this.prog = prog;
    gl.useProgram(prog);

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    for (const name of [
      "uRes", "uPos", "uDir", "uPlane", "uMapSize", "uMap", "uTex", "uNrm",
      "uTile", "uTileNrm", "uAO", "uTime", "uWallScale", "uWallV", "uTileScale", "uHalfFov", "uCyl",
      "uNumLights", "uLightPos", "uLightCol", "uLightPar", "uNumSky", "uSkyCell", "uNumSpr", "uSpr",
    ]) {
      this.u[name] = gl.getUniformLocation(prog, name);
    }

    const wallLayers = [makeWallTexture(0x51de, 0), makeWallTexture(0x51de, 1), makeWallTexture(0x51de, 2)];
    const wallNormals = wallLayers.map((t) => ({ w: t.w, h: t.h, data: computeNormal(t, 1.6) }));
    const tileLayers = [makeFloorTexture(0xb10c), makeCeilingTexture(0xc311)];
    const tileNormals = tileLayers.map((t) => ({ w: t.w, h: t.h, data: computeNormal(t, 1.2) }));
    this.wallTex = uploadArray(gl, wallLayers, gl.REPEAT);
    this.wallNrm = uploadArray(gl, wallNormals, gl.REPEAT);
    this.tileTex = uploadArray(gl, tileLayers, gl.MIRRORED_REPEAT);
    this.tileNrm = uploadArray(gl, tileNormals, gl.MIRRORED_REPEAT);
    this.aoTex = uploadArray(gl, whiteLayers(3, 512), gl.REPEAT);

    this.mapTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.mapTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(this.u.uTex ?? null, 0);
    gl.uniform1i(this.u.uNrm ?? null, 1);
    gl.uniform1i(this.u.uMap ?? null, 2);
    gl.uniform1i(this.u.uTile ?? null, 3);
    gl.uniform1i(this.u.uTileNrm ?? null, 4);
    gl.uniform1i(this.u.uAO ?? null, 5);

    gl.clearColor(0.01, 0.012, 0.02, 1);
    this.ok = true;
    this.loadUserTextures();
  }

  /** Replace procedural textures with any user-supplied images in /textures/. */
  private loadUserTextures(): void {
    void (async () => {
      const wall = await loadFirst([BASE + "textures/wall.png", BASE + "textures/wall.jpg"]);
      if (!wall || !this.gl) return;
      const [w2, w3, fl, ce, wn, w2n, w3n, fln, cen, a1, a2, a3] = await Promise.all([
        loadFirst([BASE + "textures/wall2.png", BASE + "textures/wall2.jpg"]),
        loadFirst([BASE + "textures/wall3.png", BASE + "textures/wall3.jpg"]),
        loadFirst([BASE + "textures/floor.png", BASE + "textures/floor.jpg"]),
        loadFirst([BASE + "textures/ceil.png", BASE + "textures/ceil.jpg"]),
        loadFirst([BASE + "textures/wall_n.png"]),
        loadFirst([BASE + "textures/wall2_n.png"]),
        loadFirst([BASE + "textures/wall3_n.png"]),
        loadFirst([BASE + "textures/floor_n.png"]),
        loadFirst([BASE + "textures/ceil_n.png"]),
        loadFirst([BASE + "textures/wall_ao.png"]),
        loadFirst([BASE + "textures/wall2_ao.png"]),
        loadFirst([BASE + "textures/wall3_ao.png"]),
      ]);

      const wallA = imageToTex(wall, 512);
      const wallAlbedo: Tex[] = [wallA, w2 ? imageToTex(w2, 512) : wallA, w3 ? imageToTex(w3, 512) : wallA];
      const wallNormal: Tex[] = [
        wn ? imageToTex(wn, 512) : { w: wallA.w, h: wallA.h, data: computeNormal(wallA, 1.6) },
        w2n ? imageToTex(w2n, 512) : { w: wallA.w, h: wallA.h, data: computeNormal(wallAlbedo[1], 1.6) },
        w3n ? imageToTex(w3n, 512) : { w: wallA.w, h: wallA.h, data: computeNormal(wallAlbedo[2], 1.6) },
      ];
      const white = whiteLayers(1, 512)[0];
      const wallAO: Tex[] = [
        a1 ? imageToTex(a1, 512) : white,
        a2 ? imageToTex(a2, 512) : white,
        a3 ? imageToTex(a3, 512) : white,
      ];

      const flTex = fl ? imageToTex(fl) : makeFloorTexture(0xb10c);
      const ceTex = ce ? imageToTex(ce) : makeCeilingTexture(0xc311);
      const tileAlbedo = [flTex, ceTex];
      const tileNormal: Tex[] = [
        fln ? imageToTex(fln) : { w: flTex.w, h: flTex.h, data: computeNormal(flTex, 1.2) },
        cen ? imageToTex(cen) : { w: ceTex.w, h: ceTex.h, data: computeNormal(ceTex, 1.2) },
      ];

      const gl = this.gl;
      if (!gl) return;
      for (const t of [this.wallTex, this.wallNrm, this.tileTex, this.tileNrm, this.aoTex]) {
        if (t) gl.deleteTexture(t);
      }
      this.wallTex = uploadArray(gl, wallAlbedo, gl.REPEAT);
      this.wallNrm = uploadArray(gl, wallNormal, gl.REPEAT);
      this.tileTex = uploadArray(gl, tileAlbedo, gl.MIRRORED_REPEAT);
      this.tileNrm = uploadArray(gl, tileNormal, gl.MIRRORED_REPEAT);
      this.aoTex = uploadArray(gl, wallAO, gl.REPEAT);
    })();
  }

  layout(uiCanvas: HTMLCanvasElement, rect: { x: number; y: number; w: number; h: number }): void {
    const r = uiCanvas.getBoundingClientRect();
    const sx = r.width / UI_W;
    const sy = r.height / UI_H;
    const left = r.left + rect.x * sx;
    const top = r.top + rect.y * sy;
    const w = rect.w * sx;
    const h = rect.h * sy;
    const css = this.canvas.style;
    css.left = `${left}px`;
    css.top = `${top}px`;
    css.width = `${w}px`;
    css.height = `${h}px`;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ss = 1.5;
    const bw = Math.max(1, Math.round(w * dpr * ss));
    const bh = Math.max(1, Math.round(h * dpr * ss));
    if (this.canvas.width !== bw || this.canvas.height !== bh) {
      this.canvas.width = bw;
      this.canvas.height = bh;
    }
  }

  render(state: ViewState): void {
    const gl = this.gl;
    if (!gl || !this.ok) return;

    if (state.map !== this.lastMap) {
      this.lastMap = state.map;
      const w = state.map.w;
      const h = state.map.h;
      const mask = new Uint8Array(w * h);
      for (let i = 0; i < w * h; i++) mask[i] = state.map.tiles[i] === 1 ? 255 : 0;
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, this.mapTex);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, w, h, 0, gl.RED, gl.UNSIGNED_BYTE, mask);
    }

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.prog);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.wallTex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.wallNrm);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.mapTex);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.tileTex);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.tileNrm);
    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.aoTex);

    const dv = DIR_VEC[state.dir];
    const dirX = dv.x;
    const dirY = dv.y;

    const tanH = Math.tan(this.halfFov);
    const rightX = -dirY;
    const rightY = dirX;
    const cw = this.canvas.width;
    const chh = this.canvas.height;
    const px = state.pos[0];
    const pz = state.pos[1];

    interface Cand {
      depth: number;
      x: number;
      z: number;
      h: number;
      col: [number, number, number];
      radius: number;
      intensity: number;
      type: number;
      phase: number;
    }
    const cand: Cand[] = [];
    for (const L of state.map.lights ?? []) {
      const x = L.x + 0.5 + L.dx * 0.42;
      const z = L.y + 0.5 + L.dy * 0.42;
      cand.push({
        depth: (x - px) * dirX + (z - pz) * dirY,
        x,
        z,
        h: 0.60,
        col: [1.05, 0.5, 0.2],
        radius: 2.8,
        intensity: 0.8,
        type: 0,
        phase: L.x * 1.7 + L.y * 2.3,
      });
    }
    for (const S of state.map.sky ?? []) {
      const x = S.x + 0.5;
      const z = S.y + 0.5;
      cand.push({
        depth: (x - px) * dirX + (z - pz) * dirY,
        x,
        z,
        h: 3.0,
        col: [0.44, 0.62, 1.0],
        radius: 7.0,
        intensity: 0.55,
        type: 1,
        phase: S.x + S.y,
      });
    }
    cand.sort((a, b) => a.depth - b.depth);
    const chosen = cand.slice(0, MAXL - 1);
    chosen.push({
      depth: 0.01,
      x: px + dirX * 0.3,
      z: pz + dirY * 0.3,
      h: 0.5,
      col: [1.0, 0.74, 0.46],
      radius: 2.2,
      intensity: 0.3,
      type: 2,
      phase: 0,
    });

    const lp = new Float32Array(MAXL * 3);
    const lc = new Float32Array(MAXL * 3);
    const lr = new Float32Array(MAXL * 4);
    const spr = new Float32Array(MAXL * 4);
    let nLights = 0;
    let nSpr = 0;
    for (const c of chosen) {
      lp[nLights * 3] = c.x;
      lp[nLights * 3 + 1] = c.h;
      lp[nLights * 3 + 2] = c.z;
      lc[nLights * 3] = c.col[0];
      lc[nLights * 3 + 1] = c.col[1];
      lc[nLights * 3 + 2] = c.col[2];
      lr[nLights * 4] = c.radius;
      lr[nLights * 4 + 1] = c.intensity;
      lr[nLights * 4 + 2] = c.phase;
      lr[nLights * 4 + 3] = c.type;
      nLights++;

      if (c.type === 0 && nSpr < MAXL) {
        const depth = (c.x - px) * dirX + (c.z - pz) * dirY;
        if (depth > 0.1 && depth < 18) {
          const lateral = (c.x - px) * rightX + (c.z - pz) * rightY;
          const camXs = lateral / depth / tanH;
          const sx = (camXs + 1) * 0.5 * cw;
          const sy = chh * 0.5 + (c.h - 0.5) * (chh / depth);
          const rpx = 0.17 * (chh / depth);
          spr[nSpr * 4] = sx;
          spr[nSpr * 4 + 1] = sy;
          spr[nSpr * 4 + 2] = rpx;
          spr[nSpr * 4 + 3] = depth;
          nSpr++;
        }
      }
    }

    const skyCells = new Float32Array(MAXS * 2);
    let nSky = 0;
    for (const S of state.map.sky ?? []) {
      if (nSky >= MAXS) break;
      skyCells[nSky * 2] = S.x;
      skyCells[nSky * 2 + 1] = S.y;
      nSky++;
    }

    gl.uniform1i(this.u.uNumLights ?? null, nLights);
    gl.uniform3fv(this.u.uLightPos ?? null, lp);
    gl.uniform3fv(this.u.uLightCol ?? null, lc);
    gl.uniform4fv(this.u.uLightPar ?? null, lr);
    gl.uniform1i(this.u.uNumSky ?? null, nSky);
    gl.uniform2fv(this.u.uSkyCell ?? null, skyCells);
    gl.uniform1i(this.u.uNumSpr ?? null, nSpr);
    gl.uniform4fv(this.u.uSpr ?? null, spr);

    gl.uniform2f(this.u.uRes ?? null, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.u.uPos ?? null, state.pos[0], state.pos[1]);
    gl.uniform2f(this.u.uDir ?? null, dirX, dirY);
    gl.uniform2f(this.u.uPlane ?? null, -dirY * Math.tan(this.halfFov), dirX * Math.tan(this.halfFov));
    gl.uniform2f(this.u.uMapSize ?? null, state.map.w, state.map.h);
    gl.uniform1f(this.u.uTime ?? null, state.time);
    gl.uniform1f(this.u.uWallScale ?? null, 0.25);
    gl.uniform1f(this.u.uWallV ?? null, 1.0);
    gl.uniform1f(this.u.uTileScale ?? null, 0.5);
    gl.uniform1f(this.u.uHalfFov ?? null, this.halfFov);
    gl.uniform1f(this.u.uCyl ?? null, this.cyl ? 1 : 0);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

import {
  DIR_VEC,
  Dungeon,
  ELEMENT_COLOR,
  Element,
  Member,
  MonsterInstance,
  PortraitKind,
  TILE_CHEST,
  TILE_STAIRS,
  TILE_WALL,
  CardArt,
} from "./data";
import { makeCeilingTexture, makeFloorTexture, makeWallTexture, Tex } from "./textures";
import { mulberry32 } from "./engine";

export const C = {
  bg: "#08080e",
  panel: "#14141f",
  panelHi: "#1e1e2e",
  bevelLo: "#0b0b14",
  bevelHi: "#33334d",
  line: "#2a2a40",
  text: "#e9e9f2",
  dim: "#8b8ba3",
  gold: "#d9b45c",
  goldLo: "#8a6f2f",
  hp: "#d8534f",
  mp: "#4f8fd8",
  floor: "#2a2a33",
  ceil: "#15151c",
  wall: "#5a5560",
};

export function rect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void {
  ctx.fillStyle = color;
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

export function text(
  ctx: CanvasRenderingContext2D,
  s: string,
  x: number,
  y: number,
  color = C.text,
  size = 8
): void {
  ctx.font = `${size}px "DejaVu Sans Mono", monospace`;
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  ctx.fillText(s, x | 0, y | 0);
}

export function textWidth(ctx: CanvasRenderingContext2D, s: string, size = 8): number {
  ctx.font = `${size}px "DejaVu Sans Mono", monospace`;
  return ctx.measureText(s).width;
}

export function textCenter(
  ctx: CanvasRenderingContext2D,
  s: string,
  cx: number,
  y: number,
  color = C.text,
  size = 8
): void {
  text(ctx, s, cx - textWidth(ctx, s, size) / 2, y, color, size);
}

export function frame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill = C.panel,
  hi = C.bevelHi,
  lo = C.bevelLo
): void {
  rect(ctx, x, y, w, h, fill);
  rect(ctx, x, y, w, 1, hi);
  rect(ctx, x, y, 1, h, hi);
  rect(ctx, x, y + h - 1, w, 1, lo);
  rect(ctx, x + w - 1, y, 1, h, lo);
}

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function shade(hex: string, f: number): string {
  const [r, g, b] = hexToRgb(hex);
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n * f)));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

/* ------------------------------------------------------------------ */
/* First-person grid view (raycaster)                                  */
/* ------------------------------------------------------------------ */

let wallTex: Tex[] = [];
let floorTex: Tex | null = null;
let ceilTex: Tex | null = null;
let vbuf: HTMLCanvasElement | null = null;
let vctx: CanvasRenderingContext2D | null = null;
let vimg: ImageData | null = null;
let cachedVW = 0;
let cachedVH = 0;

function ensureTextures(): void {
  if (wallTex.length) return;
  wallTex = [makeWallTexture(0x51de, 0), makeWallTexture(0x51de, 1), makeWallTexture(0x51de, 2)];
  floorTex = makeFloorTexture(0xb10c);
  ceilTex = makeCeilingTexture(0xc311);
}

function ensureBuffer(vw: number, vh: number): void {
  if (vbuf && cachedVW === vw && cachedVH === vh) return;
  cachedVW = vw;
  cachedVH = vh;
  vbuf = document.createElement("canvas");
  vbuf.width = vw;
  vbuf.height = vh;
  const c = vbuf.getContext("2d");
  if (!c) throw new Error("no view ctx");
  vctx = c;
  vctx.imageSmoothingEnabled = false;
  vimg = vctx.createImageData(vw, vh);
}

export function renderView(
  ctx: CanvasRenderingContext2D,
  d: Dungeon,
  px: number,
  py: number,
  dir: number,
  vx: number,
  vy: number,
  vw: number,
  vh: number,
  time: number
): void {
  ensureTextures();
  ensureBuffer(vw, vh);
  const fTex = floorTex as Tex;
  const cTex = ceilTex as Tex;
  const img = vimg as ImageData;
  const buf = img.data;

  const ox = px + 0.5;
  const oy = py + 0.5;
  const dv = DIR_VEC[dir];
  const dirX = dv.x;
  const dirY = dv.y;
  const planeX = -dirY * 1.5;
  const planeY = dirX * 1.5;
  const horizon = vh >> 1;

  const torch = 1 + 0.07 * Math.sin(time * 11) + 0.04 * Math.sin(time * 26 + 1.7);

  const solidAt = (x: number, y: number): boolean => {
    if (x < 0 || y < 0 || x >= d.w || y >= d.h) return true;
    return d.tiles[y * d.w + x] === TILE_WALL;
  };

  // ---- floor + ceiling (perspective cast) ----
  const rayX0 = dirX - planeX;
  const rayY0 = dirY - planeY;
  const rayX1 = dirX + planeX;
  const rayY1 = dirY + planeY;
  const posZ = 0.5 * vh;

  for (let y = 0; y < vh; y++) {
    const isFloor = y > horizon;
    const p = isFloor ? y - horizon : horizon - y;
    if (p <= 0) {
      let idx0 = y * vw * 4;
      for (let x = 0; x < vw; x++) {
        buf[idx0] = 8;
        buf[idx0 + 1] = 9;
        buf[idx0 + 2] = 13;
        buf[idx0 + 3] = 255;
        idx0 += 4;
      }
      continue;
    }
    const rowDist = posZ / p;
    const stepX = (rowDist * (rayX1 - rayX0)) / vw;
    const stepY = (rowDist * (rayY1 - rayY0)) / vw;
    let fx = ox + rowDist * rayX0;
    let fy = oy + rowDist * rayY0;
    let s = 1 / (1 + rowDist * 0.34);
    if (s > 1) s = 1;
    if (!isFloor) s *= 0.6;
    const tex = isFloor ? fTex : cTex;
    const tw = tex.w;
    const th = tex.h;
    const td = tex.data;
    let idx = y * vw * 4;
    for (let x = 0; x < vw; x++) {
      const cx = Math.floor(fx);
      const cy = Math.floor(fy);
      let tx = ((fx - cx) * tw) | 0;
      let ty = ((fy - cy) * th) | 0;
      if (tx < 0) tx = 0;
      else if (tx >= tw) tx = tw - 1;
      if (ty < 0) ty = 0;
      else if (ty >= th) ty = th - 1;
      const ti = (ty * tw + tx) * 4;
      buf[idx] = td[ti] * s;
      buf[idx + 1] = td[ti + 1] * s;
      buf[idx + 2] = td[ti + 2] * s;
      buf[idx + 3] = 255;
      idx += 4;
      fx += stepX;
      fy += stepY;
    }
  }

  // ---- walls (textured DDA) ----
  for (let col = 0; col < vw; col++) {
    const cameraX = (2 * col) / vw - 1;
    const rx = dirX + planeX * cameraX;
    const ry = dirY + planeY * cameraX;
    let mapX = Math.floor(ox);
    let mapY = Math.floor(oy);
    const dX = rx === 0 ? 1e30 : Math.abs(1 / rx);
    const dY = ry === 0 ? 1e30 : Math.abs(1 / ry);
    let stepX: number;
    let stepY: number;
    let sdX: number;
    let sdY: number;
    if (rx < 0) {
      stepX = -1;
      sdX = (ox - mapX) * dX;
    } else {
      stepX = 1;
      sdX = (mapX + 1 - ox) * dX;
    }
    if (ry < 0) {
      stepY = -1;
      sdY = (oy - mapY) * dY;
    } else {
      stepY = 1;
      sdY = (mapY + 1 - oy) * dY;
    }
    let side = 0;
    let guard = 0;
    while (guard++ < 64) {
      if (sdX < sdY) {
        sdX += dX;
        mapX += stepX;
        side = 0;
      } else {
        sdY += dY;
        mapY += stepY;
        side = 1;
      }
      if (solidAt(mapX, mapY)) break;
    }

    const perp =
      side === 0 ? (mapX - ox + (1 - stepX) / 2) / rx : (mapY - oy + (1 - stepY) / 2) / ry;
    const dist = Math.max(1e-4, perp);
    const lineH = Math.min(vh * 5, vh / dist);
    const y0 = horizon - lineH / 2;

    const hash = ((mapX * 73856093) ^ (mapY * 19349663)) >>> 0;
    const tex = wallTex[hash % wallTex.length];
    const tw = tex.w;
    const th = tex.h;
    const td = tex.data;

    let wallX = side === 0 ? oy + dist * ry : ox + dist * rx;
    wallX -= Math.floor(wallX);
    let texX = (wallX * tw) | 0;
    if ((side === 0 && rx > 0) || (side === 1 && ry < 0)) texX = tw - texX - 1;
    if (texX < 0) texX = 0;
    else if (texX >= tw) texX = tw - 1;

    let f = 1 / (1 + dist * 0.30);
    if (f > 1) f = 1;
    if (side === 1) f *= 0.74;
    f *= torch;
    const warm = Math.max(0, 1 - dist / 3.2) * 0.30 * torch;

    const sy0 = Math.max(0, Math.ceil(y0));
    const sy1 = Math.min(vh, Math.ceil(y0 + lineH));
    const stepTex = th / lineH;
    let texPos = (sy0 - y0) * stepTex;
    for (let y = sy0; y < sy1; y++) {
      let ty = texPos | 0;
      if (ty < 0) ty = 0;
      else if (ty >= th) ty = th - 1;
      texPos += stepTex;
      const ti = (ty * tw + texX) * 4;
      const idx = (y * vw + col) * 4;
      buf[idx] = td[ti] * f * (1 + warm * 0.18);
      buf[idx + 1] = td[ti + 1] * f;
      buf[idx + 2] = td[ti + 2] * f * (1 - warm * 0.10);
      buf[idx + 3] = 255;
    }
  }

  (vctx as CanvasRenderingContext2D).putImageData(img, 0, 0);
  ctx.drawImage(vbuf as HTMLCanvasElement, vx, vy);
}

/* ------------------------------------------------------------------ */
/* Holographic portrait box                                            */
/* ------------------------------------------------------------------ */

let frameImg: HTMLImageElement | null = null;
let frameTried = false;

/** Ornate frame supplied by the user at /textures/portrait_frame.png (optional). */
function frameImage(): HTMLImageElement | null {
  if (!frameTried) {
    frameTried = true;
    const im = new Image();
    im.onload = () => {
      frameImg = im;
    };
    im.onerror = () => {
      frameImg = null;
    };
    im.src = `${import.meta.env.BASE_URL}textures/portrait_frame.png`;
  }
  return frameImg;
}

let scratchCv: HTMLCanvasElement | null = null;
let scratchCtx: CanvasRenderingContext2D | null = null;
function scratch(w: number, h: number): { c: HTMLCanvasElement; g: CanvasRenderingContext2D } {
  if (!scratchCv) {
    scratchCv = document.createElement("canvas");
    scratchCtx = scratchCv.getContext("2d");
  }
  if (scratchCv.width < w) scratchCv.width = w;
  if (scratchCv.height < h) scratchCv.height = h;
  if (!scratchCtx) throw new Error("no scratch ctx");
  return { c: scratchCv, g: scratchCtx };
}

const KIND_SEED: Record<PortraitKind, number> = { warrior: 11, mage: 47, cleric: 83, spirit: 129 };

function drawStars(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, seed: number): void {
  const grd = ctx.createLinearGradient(x, y, x, y + h);
  grd.addColorStop(0, "#0a1020");
  grd.addColorStop(1, "#0a0e1a");
  ctx.fillStyle = grd;
  ctx.fillRect(x, y, w, h);
  const rng = mulberry32(seed);
  const t = performance.now() / 1000;
  const n = Math.max(40, Math.floor((w * h) / 40));
  for (let i = 0; i < n; i++) {
    const sx = x + rng() * w;
    const sy = y + rng() * h;
    const r = rng();
    const tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    ctx.fillStyle = `rgba(${(170 + rng() * 85) | 0},${(200 + rng() * 55) | 0},255,${(0.25 + 0.75 * tw).toFixed(2)})`;
    const s = r < 0.85 ? 1 : 2;
    ctx.fillRect(sx, sy, s, s);
  }
}

/** Fallback ornate gold frame if the user hasn't supplied portrait_frame.png yet. */
function drawOrnateFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  ctx.fillStyle = "#241b0e";
  ctx.fillRect(x, y, w, h);
  const golds = ["#6b5528", "#a8894a", "#dcc17e", "#f2e6b8"];
  for (let i = 0; i < golds.length; i++) {
    ctx.strokeStyle = golds[i];
    ctx.lineWidth = 1;
    ctx.strokeRect(x + i + 0.5, y + i + 0.5, w - i * 2 - 1, h - i * 2 - 1);
  }
  ctx.fillStyle = "#f2e6b8";
  const d = 2.5;
  for (const [px, py] of [
    [x + 2, y + 2],
    [x + w - 2, y + 2],
    [x + 2, y + h - 2],
    [x + w - 2, y + h - 2],
  ]) {
    ctx.beginPath();
    ctx.moveTo(px, py - d);
    ctx.lineTo(px + d, py);
    ctx.lineTo(px, py + d);
    ctx.lineTo(px - d, py);
    ctx.closePath();
    ctx.fill();
  }
}

export function drawHoloBox(
  ctx: CanvasRenderingContext2D,
  kind: PortraitKind,
  el: Element,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  const t = performance.now() / 1000;
  const im = frameImage();
  if (im && im.complete && im.naturalWidth > 0) {
    ctx.drawImage(im, x, y, w, h);
  } else {
    drawStars(ctx, x, y, w, h, KIND_SEED[kind]);
    drawOrnateFrame(ctx, x, y, w, h);
  }

  const insetX = Math.round(w * 0.13);
  const insetY = Math.round(h * 0.13);
  const ix = x + insetX;
  const iy = y + insetY;
  const iw = w - insetX * 2;
  const ih = h - insetY * 2;

  const sc = scratch(w, h);
  sc.g.clearRect(0, 0, w, h);
  drawPortrait(sc.g, kind, 0, 0, w, h, el);

  ctx.save();
  ctx.beginPath();
  ctx.rect(ix, iy, iw, ih);
  ctx.clip();

  ctx.globalAlpha = 0.9;
  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(sc.c, 0, 0, w, h, ix, iy, iw, ih);

  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "#5fc8ff";
  ctx.fillRect(ix, iy, iw, ih);

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#000814";
  for (let ly = iy; ly < iy + ih; ly += 3) ctx.fillRect(ix, ly, iw, 1);

  const barY = iy + (((t * 20) % (ih + 8)) | 0) - 4;
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#cdf1ff";
  ctx.fillRect(ix, barY, iw, 2);

  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* Party panel                                                         */
/* ------------------------------------------------------------------ */

export function drawMemberCard(
  ctx: CanvasRenderingContext2D,
  m: Member,
  x: number,
  y: number,
  w: number,
  h: number,
  active: boolean
): void {
  frame(ctx, x, y, w, h, active ? C.panelHi : C.panel, active ? C.gold : C.bevelHi, C.bevelLo);
  const portW = w - 8;
  const portH = Math.floor(h * 0.46);
  drawHoloBox(ctx, m.art, m.element, x + 4, y + 4, portW, portH);

  text(ctx, m.name, x + 4, y + portH + 6, active ? C.gold : C.text, 8);
  text(ctx, `L${m.lv}`, x + w - 4 - textWidth(ctx, `L${m.lv}`), y + portH + 6, C.dim, 8);

  const barY = y + portH + 16;
  const barW = w - 8;
  rect(ctx, x + 4, barY, barW, 3, "#000");
  rect(ctx, x + 4, barY, Math.round(barW * (m.hp / m.maxHp)), 3, C.hp);
  text(ctx, `HP${m.hp}`, x + 4, barY + 5, C.text, 8);
  rect(ctx, x + 4, barY + 15, barW, 3, "#000");
  rect(ctx, x + 4, barY + 15, Math.round(barW * (m.mp / m.maxMp)), 3, C.mp);
  text(ctx, `MP${m.mp}`, x + 4, barY + 20, C.text, 8);
}

export function drawPortrait(
  ctx: CanvasRenderingContext2D,
  kind: PortraitKind,
  x: number,
  y: number,
  w: number,
  h: number,
  el: Element
): void {
  const cx = x + (w >> 1);
  const skin = "#e6c39a";
  const accent = ELEMENT_COLOR[el];
  rect(ctx, x + 2, y + h - 10, w - 4, 8, shade(accent, 0.4));
  if (kind === "warrior") {
    rect(ctx, cx - 7, y + 6, 14, 12, skin); // face
    rect(ctx, cx - 8, y + 3, 16, 5, "#5a3d28"); // hair band
    rect(ctx, cx - 9, y + 8, 3, 8, "#3a2a1c");
    rect(ctx, cx + 6, y + 8, 3, 8, "#3a2a1c");
    rect(ctx, cx - 6, y + 11, 3, 2, "#243040");
    rect(ctx, cx + 3, y + 11, 3, 2, "#243040");
    rect(ctx, cx - 12, y + h - 20, 24, 10, "#42506a"); // shoulders
    rect(ctx, cx - 3, y + h - 22, 6, 12, accent);
  } else if (kind === "mage") {
    rect(ctx, cx - 6, y + 6, 12, 12, skin);
    rect(ctx, cx - 9, y + 2, 18, 6, "#6a4a8a"); // hood
    rect(ctx, cx - 9, y + 6, 3, 12, "#6a4a8a");
    rect(ctx, cx + 6, y + 6, 3, 12, "#6a4a8a");
    rect(ctx, cx - 5, y + 11, 3, 2, "#2a2038");
    rect(ctx, cx + 2, y + 11, 3, 2, "#2a2038");
    rect(ctx, cx - 11, y + h - 20, 22, 10, "#3a2c52");
  } else if (kind === "cleric") {
    rect(ctx, cx - 7, y + 6, 14, 12, skin);
    rect(ctx, cx - 8, y + 3, 16, 4, "#cfc8b0");
    rect(ctx, cx - 5, y + 11, 3, 2, "#3a3020");
    rect(ctx, cx + 2, y + 11, 3, 2, "#3a3020");
    rect(ctx, cx - 12, y + h - 20, 24, 10, "#8a8468");
    rect(ctx, cx - 2, y + h - 22, 4, 8, accent);
    rect(ctx, cx - 5, y + h - 19, 10, 3, accent);
  } else {
    // spirit — floating orb creature
    ctx.fillStyle = shade(accent, 1.1);
    ctx.beginPath();
    ctx.arc(cx, y + h * 0.42, w * 0.26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade(accent, 1.6);
    ctx.beginPath();
    ctx.arc(cx - 3, y + h * 0.36, w * 0.09, 0, Math.PI * 2);
    ctx.fill();
    rect(ctx, cx - 6, y + h * 0.42, 3, 3, "#101020");
    rect(ctx, cx + 3, y + h * 0.42, 3, 3, "#101020");
  }
}

/* ------------------------------------------------------------------ */
/* Message box                                                         */
/* ------------------------------------------------------------------ */

export function wrap(s: string, cols: number): string[] {
  const words = s.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + (cur ? " " : "") + w).length > cols) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur += (cur ? " " : "") + w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export function drawMessage(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  lines: string[]
): void {
  frame(ctx, x, y, w, h, "#0d0d16", C.bevelHi, C.bevelLo);
  const cols = Math.floor((w - 10) / 6);
  let ty = y + 6;
  const wrapped: string[] = [];
  for (const l of lines) wrapped.push(...wrap(l, cols));
  for (const l of wrapped.slice(-Math.floor((h - 10) / 11))) {
    text(ctx, l, x + 5, ty, C.text, 8);
    ty += 11;
  }
}

/* ------------------------------------------------------------------ */
/* Automap + compass                                                   */
/* ------------------------------------------------------------------ */

export function drawAutomap(
  ctx: CanvasRenderingContext2D,
  d: Dungeon,
  seen: Uint8Array,
  px: number,
  py: number,
  dir: number,
  vx: number,
  vy: number,
  vw: number,
  vh: number
): void {
  frame(ctx, vx, vy, vw, vh, "#05050a", C.goldLo, C.bevelLo);
  const cell = Math.max(3, Math.min((vw - 16) / d.w, (vh - 16) / d.h));
  const ox = vx + (vw - cell * d.w) / 2;
  const oy = vy + (vh - cell * d.h) / 2;

  for (let y = 0; y < d.h; y++) {
    for (let x = 0; x < d.w; x++) {
      if (!seen[y * d.w + x]) continue;
      const t = d.tiles[y * d.w + x];
      let col = t === TILE_WALL ? "#2b2b3a" : "#6b6b86";
      if (t === TILE_CHEST) col = C.gold;
      if (t === TILE_STAIRS) col = "#7fd1c0";
      rect(ctx, ox + x * cell, oy + y * cell, Math.ceil(cell), Math.ceil(cell), col);
    }
  }

  // player arrow
  const cx = ox + (px + 0.5) * cell;
  const cy = oy + (py + 0.5) * cell;
  ctx.fillStyle = "#ff5e5e";
  ctx.beginPath();
  const dv = DIR_VEC[dir];
  ctx.moveTo(cx + dv.x * cell * 0.7, cy + dv.y * cell * 0.7);
  ctx.lineTo(cx - dv.y * cell * 0.45 - dv.x * cell * 0.4, cy + dv.x * cell * 0.45 - dv.y * cell * 0.4);
  ctx.lineTo(cx + dv.y * cell * 0.45 - dv.x * cell * 0.4, cy - dv.x * cell * 0.45 - dv.y * cell * 0.4);
  ctx.closePath();
  ctx.fill();

  text(ctx, d.name, vx + 5, vy + 4, C.dim, 8);
}

const DIR_NAME = ["N", "E", "S", "W"];

export function drawCompass(
  ctx: CanvasRenderingContext2D,
  dir: number,
  cx: number,
  cy: number
): void {
  rect(ctx, cx - 13, cy - 6, 26, 12, "#0d0d16");
  text(ctx, DIR_NAME[(dir + 3) % 4], cx - 11, cy - 5, C.dim, 8);
  text(ctx, DIR_NAME[dir], cx - 3, cy - 5, C.gold, 8);
  text(ctx, DIR_NAME[(dir + 1) % 4], cx + 7, cy - 5, C.dim, 8);
}

/* ------------------------------------------------------------------ */
/* Monster cards                                                       */
/* ------------------------------------------------------------------ */

export function drawMonsterCard(
  ctx: CanvasRenderingContext2D,
  m: MonsterInstance,
  x: number,
  y: number,
  w: number,
  h: number,
  selected: boolean,
  flash: number
): void {
  const accent = ELEMENT_COLOR[m.element];
  frame(ctx, x, y, w, h, selected ? "#20203a" : "#16161f", selected ? C.gold : "#3a3a52", C.bevelLo);

  const ix = x + 4;
  const iy = y + 4;
  const iw = w - 8;
  const ih = h - 20;
  rect(ctx, ix, iy, iw, ih, "#0b0b14");
  // element-tinted vignette
  rect(ctx, ix, iy, iw, 3, shade(accent, 0.8));
  drawCardArt(ctx, m.art, m.element, ix, iy, iw, ih);
  if (flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${Math.min(0.6, flash)})`;
    ctx.fillRect(ix, iy, iw, ih);
  }

  const nameLines = wrap(m.name, Math.floor(iw / 5));
  text(ctx, nameLines[0], x + 4, y + h - 15, selected ? C.gold : C.text, 8);
  const bw = w - 8;
  rect(ctx, x + 4, y + h - 5, bw, 3, "#000");
  rect(ctx, x + 4, y + h - 5, Math.round(bw * (m.hp / m.maxHp)), 3, C.hp);
}

export function drawCardArt(
  ctx: CanvasRenderingContext2D,
  art: CardArt,
  el: Element,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  const accent = ELEMENT_COLOR[el];
  const cx = x + (w >> 1);
  const cy = y + (h >> 1);
  const light = shade(accent, 1.35);
  const dark = shade(accent, 0.6);

  ctx.fillStyle = dark;
  ctx.strokeStyle = light;
  ctx.lineWidth = 1;

  if (art === "hound") {
    rect(ctx, cx - w * 0.3, cy - h * 0.05, w * 0.55, h * 0.22, dark);
    rect(ctx, cx + w * 0.18, cy - h * 0.16, w * 0.18, h * 0.2, dark);
    rect(ctx, cx - w * 0.28, cy + h * 0.16, w * 0.1, h * 0.18, dark);
    rect(ctx, cx + w * 0.12, cy + h * 0.16, w * 0.1, h * 0.18, dark);
    rect(ctx, cx + w * 0.26, cy - h * 0.12, 3, 3, "#ffd090");
  } else if (art === "wisp") {
    ctx.beginPath();
    for (let i = 0; i <= 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = w * 0.24 * (1 + 0.25 * Math.sin(a * 3));
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r * 1.25;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff2c0";
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.08, 0, Math.PI * 2);
    ctx.fill();
  } else if (art === "golem") {
    rect(ctx, cx - w * 0.22, cy - h * 0.3, w * 0.44, h * 0.34, dark);
    rect(ctx, cx - w * 0.3, cy + h * 0.02, w * 0.6, h * 0.26, dark);
    rect(ctx, cx - w * 0.3, cy - h * 0.26, w * 0.1, h * 0.3, dark);
    rect(ctx, cx + w * 0.2, cy - h * 0.26, w * 0.1, h * 0.3, dark);
    rect(ctx, cx - w * 0.12, cy - h * 0.22, w * 0.08, 3, "#ffd090");
    rect(ctx, cx + w * 0.04, cy - h * 0.22, w * 0.08, 3, "#ffd090");
  } else {
    rect(ctx, cx - w * 0.12, cy - h * 0.12, w * 0.24, h * 0.24, dark);
    ctx.strokeStyle = light;
    for (let i = -1; i <= 1; i += 2) {
      ctx.beginPath();
      ctx.moveTo(cx + i * w * 0.1, cy - h * 0.08);
      ctx.lineTo(cx + i * w * 0.3, cy - h * 0.22);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + i * w * 0.1, cy + h * 0.08);
      ctx.lineTo(cx + i * w * 0.3, cy + h * 0.22);
      ctx.stroke();
    }
    rect(ctx, cx - 4, cy - 4, 3, 3, "#ffd090");
    rect(ctx, cx + 1, cy - 4, 3, 3, "#ffd090");
  }
}

export function deathTint(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  ctx.fillStyle = "rgba(20,10,20,0.6)";
  ctx.fillRect(x, y, w, h);
}

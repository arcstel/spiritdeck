import { mulberry32 } from "./engine";

export interface Tex {
  w: number;
  h: number;
  data: Uint8ClampedArray;
}

function makeCanvas(w: number, h: number): CanvasRenderingContext2D {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const g = cv.getContext("2d");
  if (!g) throw new Error("no 2d ctx");
  g.imageSmoothingEnabled = false;
  return g;
}

function toTex(g: CanvasRenderingContext2D, w: number, h: number): Tex {
  return { w, h, data: g.getImageData(0, 0, w, h).data };
}

function stoneColor(l: number, warm: number): string {
  const r = Math.max(0, Math.min(255, l * (0.90 + warm * 0.02)));
  const gg = Math.max(0, Math.min(255, l * 0.98));
  const b = Math.max(0, Math.min(255, l * (1.14 - warm * 0.02)));
  return `rgb(${r | 0},${gg | 0},${b | 0})`;
}

function grain(g: CanvasRenderingContext2D, w: number, h: number, rng: () => number, amt: number): void {
  const n = (w * h * amt) | 0;
  for (let i = 0; i < n; i++) {
    const x = (rng() * w) | 0;
    const y = (rng() * h) | 0;
    g.fillStyle = rng() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
    g.fillRect(x, y, 1, 1);
  }
}

function cracks(g: CanvasRenderingContext2D, w: number, h: number, rng: () => number, count: number): void {
  g.strokeStyle = "rgba(3,5,9,0.55)";
  g.lineWidth = 1;
  for (let c = 0; c < count; c++) {
    let x = rng() * w;
    let y = rng() * h;
    g.beginPath();
    g.moveTo(x, y);
    const segs = 3 + ((rng() * 5) | 0);
    for (let s = 0; s < segs; s++) {
      x += (rng() - 0.5) * w * 0.1;
      y += rng() * h * 0.08;
      g.lineTo(x, y);
    }
    g.stroke();
  }
}

function drawBlock(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  bw: number,
  bh: number,
  rng: () => number
): void {
  const inset = 3;
  const bx = x + inset;
  const by = y + inset;
  const w2 = bw - inset * 2;
  const h2 = bh - inset * 2;
  if (w2 < 6 || h2 < 6) return;

  const L = 58 + rng() * 44;
  g.fillStyle = stoneColor(L, rng());
  g.fillRect(bx, by, w2, h2);

  const blobs = 8 + ((rng() * 10) | 0);
  for (let i = 0; i < blobs; i++) {
    const cx = bx + rng() * w2;
    const cy = by + rng() * h2;
    const r = 6 + rng() * Math.min(30, Math.min(w2, h2));
    const a = 0.035 + rng() * 0.07;
    g.fillStyle = rng() < 0.5 ? `rgba(210,220,235,${a})` : `rgba(0,0,0,${a})`;
    g.beginPath();
    g.ellipse(cx, cy, r, r * 0.7, rng() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }

  // bevel relief: bright top/left, dark bottom/right
  const bw3 = Math.max(2, (w2 * 0.02) | 0);
  g.fillStyle = "rgba(225,235,250,0.16)";
  g.fillRect(bx, by, w2, bw3);
  g.fillRect(bx, by, bw3, h2);
  g.fillStyle = "rgba(0,0,0,0.45)";
  g.fillRect(bx, by + h2 - bw3, w2, bw3);
  g.fillRect(bx + w2 - bw3, by, bw3, h2);

  // inner soft AO along the bottom of each block
  const grd = g.createLinearGradient(0, by + h2 - h2 * 0.4, 0, by + h2);
  grd.addColorStop(0, "rgba(0,0,0,0)");
  grd.addColorStop(1, "rgba(0,0,0,0.22)");
  g.fillStyle = grd;
  g.fillRect(bx, by + h2 - h2 * 0.4, w2, h2 * 0.4);

  if (rng() < 0.35) {
    g.fillStyle = "rgba(0,0,0,0.22)";
    const chip = rng() < 0.5 ? bx : bx + w2 - 8;
    g.fillRect(chip, by, 8, 3);
  }
}

function drawBlockSprite(bw: number, bh: number, seed: number): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = Math.max(4, Math.ceil(bw));
  cv.height = Math.max(4, Math.ceil(bh));
  const g = cv.getContext("2d");
  if (!g) throw new Error("no ctx");
  drawBlock(g, 0, 0, cv.width, cv.height, mulberry32(seed));
  return cv;
}

function addMoss(g: CanvasRenderingContext2D, size: number, rng: () => number, amount: number): void {
  const n = (size * 0.6 * amount) | 0;
  for (let i = 0; i < n; i++) {
    const x = rng() * size;
    const y = size * (0.3 + 0.7 * rng());
    const r = 5 + rng() * 26;
    g.fillStyle = `rgba(${(36 + rng() * 40) | 0},${(64 + rng() * 66) | 0},${(28 + rng() * 30) | 0},${(0.08 + rng() * 0.2).toFixed(3)})`;
    g.beginPath();
    g.ellipse(x, y, r, r * 0.6, rng() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  const d = (size * 0.08 * amount) | 0;
  for (let i = 0; i < d; i++) {
    const x = rng() * size;
    const y0 = rng() * size * 0.5;
    const len = 20 + rng() * 130;
    g.strokeStyle = `rgba(58,78,44,${(0.05 + rng() * 0.12).toFixed(3)})`;
    g.lineWidth = 1 + rng() * 3;
    g.beginPath();
    g.moveTo(x, y0);
    g.lineTo(x, y0 + len);
    g.stroke();
  }
}

/** Seamless ashlar stone wall (wraps on both axes). variant 2 is heavily mossed. */
export function makeWallTexture(seed: number, variant: number, size = 512): Tex {
  const g = makeCanvas(size, size);
  const rng = mulberry32(seed + variant * 977);
  g.fillStyle = variant === 2 ? "#0a0e10" : "#0b0e14";
  g.fillRect(0, 0, size, size);

  const rows = 6;
  const rowH = size / rows;
  const blocks: { x: number; y: number; bw: number; bh: number; seed: number }[] = [];
  let y = -rowH * 0.5;
  while (y < size) {
    let x = -Math.floor(rng() * 150);
    while (x < size) {
      const bw = 92 + rng() * 84;
      blocks.push({ x, y, bw, bh: rowH, seed: (rng() * 1e9) | 0 });
      x += bw + 6;
    }
    y += rowH + 6;
  }
  for (const b of blocks) {
    const sprite = drawBlockSprite(b.bw, b.bh, b.seed);
    for (const dx of [-size, 0, size]) {
      for (const dy of [-size, 0, size]) {
        g.drawImage(sprite, b.x + dx, b.y + dy);
      }
    }
  }

  addMoss(g, size, rng, variant === 2 ? 1.0 : 0.45);
  grain(g, size, size, rng, 0.07);
  cracks(g, size, size, rng, variant === 2 ? 5 : 3);

  const grd = g.createLinearGradient(0, 0, 0, size);
  grd.addColorStop(0, "rgba(0,0,0,0.30)");
  grd.addColorStop(0.5, "rgba(0,0,0,0)");
  grd.addColorStop(1, "rgba(0,0,0,0.30)");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);

  return toTex(g, size, size);
}

/** Large slate floor tiles. */
export function makeFloorTexture(seed: number, size = 512): Tex {
  const g = makeCanvas(size, size);
  const rng = mulberry32(seed + 131);
  g.fillStyle = "#0b0e14";
  g.fillRect(0, 0, size, size);
  const tile = size / 2;
  for (let ty = 0; ty < size; ty += tile) {
    for (let tx = 0; tx < size; tx += tile) {
      const L = 40 + rng() * 26;
      g.fillStyle = stoneColor(L, rng());
      g.fillRect(tx + 3, ty + 3, tile - 6, tile - 6);
      const blobs = 6 + ((rng() * 8) | 0);
      for (let i = 0; i < blobs; i++) {
        const cx = tx + 6 + rng() * (tile - 12);
        const cy = ty + 6 + rng() * (tile - 12);
        const r = 8 + rng() * 34;
        const a = 0.05 + rng() * 0.09;
        g.fillStyle = rng() < 0.5 ? `rgba(200,215,235,${a})` : `rgba(0,0,0,${a})`;
        g.beginPath();
        g.ellipse(cx, cy, r, r * 0.8, rng() * Math.PI, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = "rgba(225,235,250,0.07)";
      g.fillRect(tx + 3, ty + 3, tile - 6, 2);
      g.fillStyle = "rgba(0,0,0,0.4)";
      g.fillRect(tx + 3, ty + tile - 4, tile - 6, 2);
    }
  }
  grain(g, size, size, rng, 0.05);
  return toTex(g, size, size);
}

/** Rough dark ceiling stone. */
export function makeCeilingTexture(seed: number, size = 512): Tex {
  const g = makeCanvas(size, size);
  const rng = mulberry32(seed + 271);
  g.fillStyle = "#0a0c11";
  g.fillRect(0, 0, size, size);
  const n = (size * 0.4) | 0;
  for (let i = 0; i < n; i++) {
    const cx = rng() * size;
    const cy = rng() * size;
    const r = size * 0.01 + rng() * size * 0.035;
    const L = 16 + rng() * 16;
    g.fillStyle = stoneColor(L, rng());
    g.globalAlpha = 0.25 + rng() * 0.25;
    g.beginPath();
    g.ellipse(cx, cy, r, r * 0.8, rng() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  grain(g, size, size, rng, 0.12);
  return toTex(g, size, size);
}

/** Derive a tangent-space normal map from an albedo texture's luminance. */
export function computeNormal(tex: Tex, strength: number): Uint8ClampedArray {
  const { w, h, data } = tex;
  const out = new Uint8ClampedArray(w * h * 4);
  const lum = (x: number, y: number): number => {
    const xx = ((x % w) + w) % w;
    const yy = ((y % h) + h) % h;
    const i = (yy * w + xx) * 4;
    return (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tl = lum(x - 1, y - 1);
      const t = lum(x, y - 1);
      const tr = lum(x + 1, y - 1);
      const l = lum(x - 1, y);
      const r = lum(x + 1, y);
      const bl = lum(x - 1, y + 1);
      const b = lum(x, y + 1);
      const br = lum(x + 1, y + 1);
      const dx = tl + 2 * l + bl - (tr + 2 * r + br);
      const dy = tl + 2 * t + tr - (bl + 2 * b + br);
      let nx = dx * strength;
      let ny = dy * strength;
      const nz = 1;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      const i = (y * w + x) * 4;
      out[i] = (nx * 0.5 + 0.5) * 255;
      out[i + 1] = (ny * 0.5 + 0.5) * 255;
      out[i + 2] = (nz / len * 0.5 + 0.5) * 255;
      out[i + 3] = 255;
    }
  }
  return out;
}

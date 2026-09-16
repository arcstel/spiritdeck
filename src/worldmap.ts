import { mulberry32 } from "./engine";

export const W_WATER = 0;
export const W_SAND = 1;
export const W_GRASS = 2;
export const W_FOREST = 3;
export const W_HILL = 4;
export const W_MTN = 5;
export const W_ROAD = 6;

export interface WorldNode {
  x: number;
  y: number;
  kind: "dungeon" | "city";
  name: string;
}

export interface World {
  w: number;
  h: number;
  tiles: Uint8Array;
  nodes: WorldNode[];
  seed: number;
}

const TILE_COL: string[] = [
  "#2b5f8a",
  "#d9c48a",
  "#4a7a3a",
  "#2f5a2a",
  "#6b6350",
  "#8a8a90",
  "#b9a06a",
];

const CITY_NAMES = ["Emberfall", "Thornwick", "Duskmere", "Coldharbour", "Ashfen", "Greyford"];

function valueNoise(seed: number): (x: number, y: number) => number {
  const rng = mulberry32(seed >>> 0);
  const N = 64;
  const g = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) g[i] = rng();
  const at = (x: number, y: number): number => g[(((y % N) + N) % N) * N + (((x % N) + N) % N)];
  const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
  const smooth = (t: number): number => t * t * (3 - 2 * t);
  return (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = smooth(x - xi);
    const yf = smooth(y - yi);
    return lerp(lerp(at(xi, yi), at(xi + 1, yi), xf), lerp(at(xi, yi + 1), at(xi + 1, yi + 1), xf), yf);
  };
}

function carveRoad(tiles: Uint8Array, w: number, h: number, a: WorldNode, b: WorldNode): void {
  let x = a.x;
  let y = a.y;
  const put = (px: number, py: number) => {
    if (px < 0 || py < 0 || px >= w || py >= h) return;
    tiles[py * w + px] = W_ROAD;
  };
  while (x !== b.x) {
    x += Math.sign(b.x - x);
    put(x, y);
    put(x, y + 1);
  }
  while (y !== b.y) {
    y += Math.sign(b.y - y);
    put(x, y);
    put(x + 1, y);
  }
}

export function generateWorld(seed: number): World {
  const w = 64;
  const h = 36;
  const tiles = new Uint8Array(w * h);
  const n1 = valueNoise(seed);
  const n2 = valueNoise(seed * 7919 + 13);
  const n3 = valueNoise(seed * 104729 + 7);
  const rng = mulberry32((seed ^ 0x5bd1e995) >>> 0);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = x / 11;
      const ny = y / 11;
      const e = n1(nx, ny) * 0.62 + n2(nx * 2.1, ny * 2.1) * 0.27 + n3(nx * 4.3, ny * 4.3) * 0.11;
      const dx = (x - w / 2) / (w / 2);
      const dy = (y - h / 2) / (h / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      const v = e - Math.max(0, d - 0.6) * 2.3;
      let t: number;
      if (v < 0.32) t = W_WATER;
      else if (v < 0.355) t = W_SAND;
      else if (v < 0.5) t = W_GRASS;
      else if (v < 0.62) t = W_FOREST;
      else if (v < 0.73) t = W_HILL;
      else t = W_MTN;
      tiles[y * w + x] = t;
    }
  }

  const findLand = (fromX: number, fromY: number): { x: number; y: number } => {
    for (let r = 0; r < 44; r++) {
      for (let a = 0; a < 28; a++) {
        const ang = (a / 28) * Math.PI * 2;
        const x = Math.round(fromX + Math.cos(ang) * r);
        const y = Math.round(fromY + Math.sin(ang) * r);
        if (x < 1 || y < 1 || x >= w - 1 || y >= h - 1) continue;
        const t = tiles[y * w + x];
        if (t === W_GRASS || t === W_FOREST || t === W_SAND) return { x, y };
      }
    }
    return { x: Math.round(fromX), y: Math.round(fromY) };
  };

  const dpos = findLand(w * 0.32, h * 0.5);
  const cpos = findLand(w * 0.7, h * 0.5);
  const nodes: WorldNode[] = [
    { x: dpos.x, y: dpos.y, kind: "dungeon", name: "Sunken Vault" },
    { x: cpos.x, y: cpos.y, kind: "city", name: CITY_NAMES[Math.floor(rng() * CITY_NAMES.length)] },
  ];
  carveRoad(tiles, w, h, nodes[0], nodes[1]);
  carveRoad(tiles, w, h, nodes[1], nodes[0]);
  return { w, h, tiles, nodes, seed };
}

function hash2(x: number, y: number): number {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

export function drawWorld(
  ctx: CanvasRenderingContext2D,
  world: World,
  marker: number,
  t: number,
  W: number,
  H: number
): void {
  const cell = Math.min(W / world.w, H / world.h);
  const ox = (W - cell * world.w) / 2;
  const oy = (H - cell * world.h) / 2;
  ctx.fillStyle = "#0a0d12";
  ctx.fillRect(0, 0, W, H);

  for (let y = 0; y < world.h; y++) {
    for (let x = 0; x < world.w; x++) {
      const tv = world.tiles[y * world.w + x];
      const j = hash2(x, y) * 0.12 - 0.06;
      ctx.fillStyle = shade(TILE_COL[tv], j);
      ctx.fillRect(ox + x * cell, oy + y * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }

  // node markers
  world.nodes.forEach((n, i) => {
    const px = ox + (n.x + 0.5) * cell;
    const py = oy + (n.y + 0.5) * cell;
    if (n.kind === "city") {
      ctx.fillStyle = "#6b4a2a";
      for (const [dx, dy] of [
        [-1, -1],
        [0, -1],
        [1, -1],
      ] as [number, number][]) {
        ctx.fillRect(px + dx * cell - cell * 0.3, py + dy * cell - cell * 0.4, cell * 0.7, cell * 0.9);
      }
      ctx.fillStyle = "#c9a24a";
      ctx.fillRect(px - cell * 0.35, py - cell * 1.3, cell * 0.7, cell * 0.5);
    } else {
      ctx.fillStyle = "#1a1a22";
      ctx.beginPath();
      ctx.arc(px, py, cell * 0.7, 0, 7);
      ctx.fill();
      ctx.fillStyle = "#3a3a46";
      ctx.fillRect(px - cell * 0.3, py - cell * 0.1, cell * 0.6, cell * 0.6);
    }
    const chosen = i === marker;
    const blink = 0.6 + 0.4 * Math.sin(t * 4);
    ctx.strokeStyle = chosen ? `rgba(255,90,90,${blink.toFixed(2)})` : "rgba(255,255,255,0.35)";
    ctx.lineWidth = chosen ? 2 : 1;
    ctx.strokeRect(px - cell, py - cell, cell * 2, cell * 2);
  });

  const n = world.nodes[marker];
  ctx.fillStyle = "rgba(8,8,14,0.82)";
  ctx.fillRect(0, H - 34, W, 34);
  ctx.strokeStyle = "#c9a24a";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, H - 33.5, W - 1, 33);
  ctx.font = "10px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#e8d9a8";
  ctx.fillText(n.name, W / 2, H - 19);
  ctx.fillStyle = "#9a9aa8";
  ctx.fillText("[<] [>] choose      [Z] enter", W / 2, H - 6);
  ctx.textAlign = "left";
}

function shade(hex: string, amt: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v * (1 + amt))));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

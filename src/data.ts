import { mulberry32 } from "./engine";

export type Element = "ember" | "frost" | "gale" | "stone" | "spirit";

export const ELEMENTS: Element[] = ["ember", "frost", "gale", "stone", "spirit"];

export const ELEMENT_COLOR: Record<Element, string> = {
  ember: "#e8663c",
  frost: "#5fb4e6",
  gale: "#6fd28a",
  stone: "#c79a5b",
  spirit: "#c07fe0",
};

/** ember > gale > stone > frost > ember ; spirit is neutral vs all. */
export function elementMult(atk: Element, def: Element): number {
  if (atk === "spirit" || def === "spirit") return 1;
  const beats: Record<Element, Element> = {
    ember: "gale",
    gale: "stone",
    stone: "frost",
    frost: "ember",
    spirit: "spirit",
  };
  if (beats[atk] === def) return 1.5;
  if (beats[def] === atk) return 0.75;
  return 1;
}

export interface Spell {
  id: string;
  name: string;
  cost: number;
  power: number;
  element: Element;
  kind: "attack" | "heal" | "ward";
  target: "enemy" | "all-enemies" | "ally";
  desc: string;
}

export const SPELLS: Record<string, Spell> = {
  emberlash: {
    id: "emberlash",
    name: "Ember Lash",
    cost: 4,
    power: 15,
    element: "ember",
    kind: "attack",
    target: "enemy",
    desc: "A whip of fire sears one foe.",
  },
  frostbite: {
    id: "frostbite",
    name: "Frostbite",
    cost: 5,
    power: 17,
    element: "frost",
    kind: "attack",
    target: "enemy",
    desc: "Biting cold scours a single foe.",
  },
  galewind: {
    id: "galewind",
    name: "Galewind",
    cost: 7,
    power: 11,
    element: "gale",
    kind: "attack",
    target: "all-enemies",
    desc: "A cutting gust tears every foe.",
  },
  mend: {
    id: "mend",
    name: "Mend",
    cost: 4,
    power: 22,
    element: "spirit",
    kind: "heal",
    target: "ally",
    desc: "Knits an ally's wounds shut.",
  },
  stoneskin: {
    id: "stoneskin",
    name: "Stoneskin",
    cost: 5,
    power: 4,
    element: "stone",
    kind: "ward",
    target: "ally",
    desc: "Stoneskin raises an ally's guard.",
  },
};

export interface Member {
  id: string;
  name: string;
  role: string;
  element: Element;
  lv: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  atk: number;
  def: number;
  spd: number;
  guard: number;
  spells: string[];
  art: PortraitKind;
}

export type PortraitKind = "warrior" | "mage" | "cleric" | "spirit";

export function makeParty(): Member[] {
  return [
    {
      id: "arcstel",
      name: "Arcstel",
      role: "Swordhand",
      element: "ember",
      lv: 1,
      hp: 36,
      maxHp: 36,
      mp: 6,
      maxMp: 6,
      atk: 12,
      def: 9,
      spd: 7,
      guard: 0,
      spells: [],
      art: "warrior",
    },
    {
      id: "orin",
      name: "Orin",
      role: "Warden",
      element: "stone",
      lv: 1,
      hp: 30,
      maxHp: 30,
      mp: 13,
      maxMp: 13,
      atk: 8,
      def: 7,
      spd: 5,
      guard: 0,
      spells: ["mend", "stoneskin"],
      art: "cleric",
    },
    {
      id: "nemne",
      name: "Nemne",
      role: "Emberwright",
      element: "ember",
      lv: 1,
      hp: 24,
      maxHp: 24,
      mp: 18,
      maxMp: 18,
      atk: 6,
      def: 5,
      spd: 6,
      guard: 0,
      spells: ["emberlash", "frostbite", "galewind"],
      art: "mage",
    },
    {
      id: "vesper",
      name: "Vesper",
      role: "Familiar",
      element: "gale",
      lv: 1,
      hp: 22,
      maxHp: 22,
      mp: 12,
      maxMp: 12,
      atk: 9,
      def: 4,
      spd: 10,
      guard: 0,
      spells: ["galewind"],
      art: "spirit",
    },
  ];
}

export interface MonsterTemplate {
  id: string;
  name: string;
  element: Element;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  xp: number;
  gold: number;
  art: CardArt;
}

export type CardArt = "hound" | "wisp" | "golem" | "mite";

export const MONSTERS: MonsterTemplate[] = [
  { id: "hound", name: "Marrow Hound", element: "stone", hp: 20, atk: 8, def: 5, spd: 7, xp: 6, gold: 5, art: "hound" },
  { id: "wisp", name: "Ash Wisp", element: "ember", hp: 15, atk: 7, def: 2, spd: 9, xp: 5, gold: 4, art: "wisp" },
  { id: "mite", name: "Rime Mite", element: "frost", hp: 13, atk: 6, def: 3, spd: 8, xp: 5, gold: 4, art: "mite" },
  { id: "golem", name: "Vault Sentinel", element: "stone", hp: 30, atk: 11, def: 9, spd: 4, xp: 12, gold: 10, art: "golem" },
];

export interface MonsterInstance extends MonsterTemplate {
  uid: number;
  maxHp: number;
}

export function rollEncounter(seed: number, size: number): MonsterInstance[] {
  const rng = mulberry32(seed);
  const pool = MONSTERS;
  const out: MonsterInstance[] = [];
  for (let i = 0; i < size; i++) {
    const t = pool[Math.floor(rng() * pool.length)];
    out.push({ ...t, uid: i, maxHp: t.hp });
  }
  return out;
}

export const ITEMS: Record<string, { name: string; kind: "heal" | "mp"; power: number }> = {
  draught: { name: "Cinder Draught", kind: "heal", power: 25 },
  dew: { name: "Spirit Dew", kind: "mp", power: 10 },
};

/** A wall-mounted torch: cell of the wall, plus the normal facing into the room. */
export interface TorchLight {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

/** A shaft in the ceiling that lets cool daylight down onto the floor. */
export interface SkyLight {
  x: number;
  y: number;
}

export interface Dungeon {
  name: string;
  w: number;
  h: number;
  tiles: Uint8Array;
  start: { x: number; y: number; dir: number };
  lights?: TorchLight[];
  sky?: SkyLight[];
  decor?: Decor[];
}

export const TILE_FLOOR = 0;
export const TILE_WALL = 1;
export const TILE_CHEST = 2;
export const TILE_STAIRS = 3;
export const TILE_BARS = 4;
export const TILE_DOOR = 5;
export const TILE_KEY = 6;

/** Tiles that block movement (and sight beyond, except bars which see through). */
export function isSolid(t: number): boolean {
  return t === TILE_WALL || t === TILE_BARS || t === TILE_DOOR;
}

export type DecorKind =
  | "brazier"
  | "map"
  | "fountain"
  | "table"
  | "gargoyle"
  | "skeleton"
  | "rat"
  | "urn"
  | "barrel"
  | "web"
  | "chain"
  | "grate";

/** Decorative prop. For wall-mounted kinds, (x,y) is the wall cell and
 *  (dx,dy) points from the wall into the open room. */
export interface Decor {
  kind: DecorKind;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

/** Kinds the player cannot walk through (placed only in open rooms). */
export const DECOR_BLOCKS: ReadonlySet<DecorKind> = new Set<DecorKind>([
  "fountain",
  "table",
  "gargoyle",
  "urn",
  "barrel",
]);


/**
 * Scatter torches along wall faces and cut a few daylight shafts in the
 * ceiling. Kept deterministic from the dungeon seed so the renderer sees a
 * stable set of lights frame to frame.
 */
export function addAmbiance(d: Dungeon, seed = 1): void {
  const rng = mulberry32(seed >>> 0);
  const isFloor = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < d.w && y < d.h && !isSolid(d.tiles[y * d.w + x]);

  const lights: TorchLight[] = [];
  for (let y = 1; y < d.h - 1; y++) {
    for (let x = 1; x < d.w - 1; x++) {
      if (!isFloor(x, y)) continue;
      for (const v of DIR_VEC) {
        const wx = x + v.x;
        const wy = y + v.y;
        if (wx < 0 || wy < 0 || wx >= d.w || wy >= d.h) continue;
        if (d.tiles[wy * d.w + wx] !== TILE_WALL) continue;
        let tooClose = false;
        for (const L of lights) {
          if (Math.abs(L.x - wx) + Math.abs(L.y - wy) < 2) {
            tooClose = true;
            break;
          }
        }
        if (tooClose || rng() < 0.2) continue;
        lights.push({ x: wx, y: wy, dx: -v.x, dy: -v.y });
      }
    }
  }

  const sky: SkyLight[] = [];
  for (let y = 1; y < d.h - 1; y++) {
    for (let x = 1; x < d.w - 1; x++) {
      if (!isFloor(x, y)) continue;
      let open = 0;
      for (const v of DIR_VEC) if (isFloor(x + v.x, y + v.y)) open++;
      if (open < 3) continue;
      let tooClose = false;
      for (const s of sky) {
        if (Math.abs(s.x - x) + Math.abs(s.y - y) < 5) {
          tooClose = true;
          break;
        }
      }
      if (tooClose || rng() < 0.35) continue;
      sky.push({ x, y });
    }
  }

  d.lights = lights;
  d.sky = sky;
}

export function generateDungeon(seed: number): Dungeon {
  const w = 33;
  const h = 33;
  const tiles = new Uint8Array(w * h).fill(TILE_WALL);
  const rng = mulberry32(seed);
  const ri = (n: number) => Math.floor(rng() * n);
  const carve = (x: number, y: number) => {
    if (x > 0 && y > 0 && x < w - 1 && y < h - 1) tiles[y * w + x] = TILE_FLOOR;
  };

  interface Room {
    x: number;
    y: number;
    w: number;
    h: number;
    cx: number;
    cy: number;
  }
  const rooms: Room[] = [];
  for (let i = 0; i < 12; i++) {
    for (let tries = 0; tries < 40; tries++) {
      const rw = 4 + ri(5);
      const rh = 4 + ri(5);
      const rx = 1 + ri(w - rw - 2);
      const ry = 1 + ri(h - rh - 2);
      let ok = true;
      for (const r of rooms) {
        if (rx - 2 < r.x + r.w && rx + rw + 2 > r.x && ry - 2 < r.y + r.h && ry + rh + 2 > r.y) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      for (let y = ry; y < ry + rh; y++) for (let x = rx; x < rx + rw; x++) carve(x, y);
      rooms.push({ x: rx, y: ry, w: rw, h: rh, cx: Math.floor(rx + rw / 2), cy: Math.floor(ry + rh / 2) });
      break;
    }
  }
  const inAnyRoom = (x: number, y: number): boolean =>
    rooms.some((r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h);

  const connections: number[][] = [];
  const connect = (a: Room, b: Room) => {
    const path: number[] = [];
    let x = a.cx;
    let y = a.cy;
    const wx = 2 + ri(w - 4);
    const wy = 2 + ri(h - 4);
    const leg = (tx: number, ty: number) => {
      while (x !== tx) {
        x += Math.sign(tx - x);
        carve(x, y);
        path.push(y * w + x);
      }
      while (y !== ty) {
        y += Math.sign(ty - y);
        carve(x, y);
        path.push(y * w + x);
      }
    };
    leg(wx, a.cy);
    leg(wx, wy);
    leg(b.cx, wy);
    leg(b.cx, b.cy);
    connections.push(path);
  };
  for (let i = 1; i < rooms.length; i++) connect(rooms[i - 1], rooms[i]);
  for (let i = 0; i < 2 && rooms.length > 4; i++) {
    const a = rooms[ri(rooms.length)];
    const b = rooms[ri(rooms.length)];
    if (a !== b) connect(a, b);
  }

  const startRoom = rooms[0];
  const start = { x: startRoom.cx, y: startRoom.cy, dir: 1 };
  const last = rooms[rooms.length - 1];
  tiles[last.cy * w + last.cx] = TILE_STAIRS;

  const doors: { x: number; y: number }[] = [];

  // vault door gating the stair room
  const vaultConn = connections[rooms.length - 2];
  if (vaultConn) {
    for (const idx of vaultConn) {
      const x = idx % w;
      const y = (idx / w) | 0;
      if (inAnyRoom(x, y)) continue;
      tiles[idx] = TILE_DOOR;
      doors.push({ x, y });
      break;
    }
  }

  // prison chambers: a 3x3 pocket walled off with an iron grate + locked door
  const prisons: { x: number; y: number }[] = [];
  const prisonRects: { x: number; y: number }[] = [];
  const nearPrison = (px: number, py: number): boolean =>
    prisonRects.some((p) => Math.abs(p.x - px) < 3 && Math.abs(p.y - py) < 3);
  const tryPrison = () => {
    for (let t = 0; t < 90; t++) {
      const px = 2 + ri(w - 7);
      const py = 2 + ri(h - 7);
      if (nearPrison(px, py)) continue;
      let pureWall = true;
      for (let y = py; y < py + 3 && pureWall; y++) {
        for (let x = px; x < px + 3; x++) {
          if (tiles[y * w + x] !== TILE_WALL) {
            pureWall = false;
            break;
          }
        }
      }
      if (!pureWall) continue;
      const sides = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
      ];
      for (const s of sides) {
        const mx = s.dx !== 0 ? (s.dx < 0 ? px : px + 2) : px + 1;
        const my = s.dy !== 0 ? (s.dy < 0 ? py : py + 2) : py + 1;
        const ox = mx + s.dx;
        const oy = my + s.dy;
        if (ox < 0 || oy < 0 || ox >= w || oy >= h) continue;
        if (tiles[oy * w + ox] !== TILE_FLOOR) continue;
        for (let y = py; y < py + 3; y++) for (let x = px; x < px + 3; x++) tiles[y * w + x] = TILE_FLOOR;
        for (let i = 0; i < 3; i++) {
          const cx = s.dy !== 0 ? px + i : mx;
          const cy = s.dx !== 0 ? py + i : my;
          tiles[cy * w + cx] = TILE_BARS;
        }
        tiles[my * w + mx] = TILE_DOOR;
        doors.push({ x: mx, y: my });
        prisonRects.push({ x: px, y: py });
        if (tiles[(py + 1) * w + px + 1] === TILE_FLOOR) tiles[(py + 1) * w + px + 1] = TILE_CHEST;
        return { x: px, y: py + 1 };
      }
    }
    return null;
  };
  for (let i = 0; i < 2; i++) {
    const p = tryPrison();
    if (p) prisons.push(p);
  }

  // reachability from the start (doors are treated as solid)
  const reach = new Uint8Array(w * h);
  {
    const q: number[] = [start.y * w + start.x];
    reach[start.y * w + start.x] = 1;
    while (q.length) {
      const idx = q.pop()!;
      const x = idx % w;
      const y = (idx / w) | 0;
      for (const v of DIR_VEC) {
        const nx = x + v.x;
        const ny = y + v.y;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const ni = ny * w + nx;
        if (reach[ni] || isSolid(tiles[ni])) continue;
        reach[ni] = 1;
        q.push(ni);
      }
    }
  }

  // one key per locked door, placed reachable from the start
  let keysPlaced = 0;
  for (let t = 0; t < 400 && keysPlaced < doors.length; t++) {
    const x = 1 + ri(w - 2);
    const y = 1 + ri(h - 2);
    const i = y * w + x;
    if (!reach[i] || tiles[i] !== TILE_FLOOR) continue;
    if (Math.abs(x - start.x) + Math.abs(y - start.y) < 4) continue;
    tiles[i] = TILE_KEY;
    keysPlaced++;
  }
  for (let i = keysPlaced; i < doors.length; i++) {
    const d = doors[i];
    if (tiles[d.y * w + d.x] === TILE_DOOR) tiles[d.y * w + d.x] = TILE_FLOOR;
  }

  // sparse treasure
  for (const r of rooms.slice(1, -1)) {
    if (rng() < 0.28 && tiles[r.cy * w + r.cx] === TILE_FLOOR) tiles[r.cy * w + r.cx] = TILE_CHEST;
  }

  const dungeon: Dungeon = { name: "Sunken Vault — B1", w, h, tiles, start };
  addAmbiance(dungeon, seed);

  // decor
  const decor: Decor[] = [];
  const mid = rooms.slice(1, -1);
  for (const r of mid) {
    const roll = rng();
    if (roll < 0.14) {
      if (tiles[r.cy * w + r.cx] === TILE_FLOOR) decor.push({ kind: "fountain", x: r.cx, y: r.cy, dx: 0, dy: 0 });
    } else if (roll < 0.34) {
      for (let tries = 0; tries < 6; tries++) {
        const x = r.x + ri(r.w);
        const y = r.y + ri(r.h);
        if (tiles[y * w + x] === TILE_FLOOR) {
          decor.push({ kind: "table", x, y, dx: 0, dy: 0 });
          break;
        }
      }
    } else if (roll < 0.52) {
      for (const [x, y] of [
        [r.x, r.y],
        [r.x + r.w - 1, r.y],
      ] as [number, number][]) {
        if (tiles[y * w + x] === TILE_FLOOR) decor.push({ kind: "gargoyle", x, y, dx: 0, dy: 0 });
      }
    } else if (roll < 0.8) {
      const n = 1 + ri(2);
      for (let i = 0; i < n; i++) {
        const x = r.x + ri(r.w);
        const y = r.y + ri(r.h);
        if (tiles[y * w + x] === TILE_FLOOR) decor.push({ kind: "skeleton", x, y, dx: 0, dy: 0 });
      }
    }
  }
  const taken = new Set<number>();
  for (const dc of decor) taken.add(dc.y * w + dc.x);
  for (const r of mid) {
    if (rng() < 0.5) {
      const n = 1 + ri(3);
      for (let i = 0; i < n; i++) {
        const x = r.x + ri(r.w);
        const y = r.y + ri(r.h);
        const idx = y * w + x;
        if (tiles[idx] !== TILE_FLOOR || taken.has(idx)) continue;
        taken.add(idx);
        decor.push({ kind: rng() < 0.5 ? "urn" : "barrel", x, y, dx: 0, dy: 0 });
      }
    }
  }
  for (const r of mid) {
    if (rng() < 0.35) {
      for (const [x, y] of [
        [r.x, r.y],
        [r.x + r.w - 1, r.y],
        [r.x, r.y + r.h - 1],
        [r.x + r.w - 1, r.y + r.h - 1],
      ] as [number, number][]) {
        if (tiles[y * w + x] === TILE_FLOOR && rng() < 0.5) decor.push({ kind: "web", x, y, dx: 0, dy: 0 });
      }
    }
  }
  for (const p of prisons) decor.push({ kind: "chain", x: p.x + 1, y: p.y, dx: 0, dy: 0 });

  // rats only in a couple of spots
  const ratRooms = mid.filter(() => rng() < 0.22).slice(0, 2);
  for (const r of ratRooms) {
    const n = 2 + ri(2);
    for (let i = 0; i < n; i++) {
      const x = r.x + ri(r.w);
      const y = r.y + ri(r.h);
      if (tiles[y * w + x] === TILE_FLOOR) decor.push({ kind: "rat", x, y, dx: 0, dy: 0 });
    }
  }
  // skeletons slumped in some prison cells
  for (const p of prisons) decor.push({ kind: "skeleton", x: p.x, y: p.y, dx: 0, dy: 0 });

  // old maps and barred windows on wall faces, avoiding torch spots
  const lightCell = new Set((dungeon.lights ?? []).map((L) => L.y * w + L.x));
  let maps = 0;
  let grates = 0;
  for (let y = 1; y < h - 1 && (maps < 6 || grates < 5); y++) {
    for (let x = 1; x < w - 1; x++) {
      if (isSolid(tiles[y * w + x])) continue;
      for (const v of DIR_VEC) {
        const wx = x + v.x;
        const wy = y + v.y;
        if (wx < 1 || wy < 1 || wx >= w - 1 || wy >= h - 1) continue;
        if (tiles[wy * w + wx] !== TILE_WALL) continue;
        if (lightCell.has(wy * w + wx)) continue;
        const r = rng();
        if (maps < 6 && r < 0.05) {
          decor.push({ kind: "map", x: wx, y: wy, dx: -v.x, dy: -v.y });
          maps++;
          break;
        }
        if (grates < 5 && r > 0.94) {
          decor.push({ kind: "grate", x: wx, y: wy, dx: -v.x, dy: -v.y });
          grates++;
          break;
        }
      }
    }
  }

  dungeon.decor = decor;
  return dungeon;
}

export const DIR_VEC: { x: number; y: number }[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

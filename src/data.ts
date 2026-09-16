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
      id: "kael",
      name: "Kael",
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
      id: "lyra",
      name: "Lyra",
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
}

export const TILE_WALL = 1;
export const TILE_FLOOR = 0;
export const TILE_CHEST = 2;
export const TILE_STAIRS = 3;

/**
 * Scatter torches along wall faces and cut a few daylight shafts in the
 * ceiling. Kept deterministic from the dungeon seed so the renderer sees a
 * stable set of lights frame to frame.
 */
export function addAmbiance(d: Dungeon, seed = 1): void {
  const rng = mulberry32(seed >>> 0);
  const isFloor = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < d.w && y < d.h && d.tiles[y * d.w + x] !== TILE_WALL;

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
          if (Math.abs(L.x - wx) + Math.abs(L.y - wy) < 3) {
            tooClose = true;
            break;
          }
        }
        if (tooClose || rng() < 0.42) continue;
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
  const w = 21;
  const h = 21;
  const tiles = new Uint8Array(w * h).fill(TILE_WALL);
  const rng = mulberry32(seed);
  const ri = (n: number) => Math.floor(rng() * n);
  const carve = (x: number, y: number) => {
    if (x > 0 && y > 0 && x < w - 1 && y < h - 1) tiles[y * w + x] = TILE_FLOOR;
  };

  const rooms: { cx: number; cy: number }[] = [];
  let prev: { cx: number; cy: number } | null = null;

  for (let i = 0; i < 8; i++) {
    const rw = 3 + ri(4);
    const rh = 3 + ri(4);
    const rx = 1 + ri(w - rw - 2);
    const ry = 1 + ri(h - rh - 2);
    for (let y = ry; y < ry + rh; y++) for (let x = rx; x < rx + rw; x++) carve(x, y);
    const c = { cx: Math.floor(rx + rw / 2), cy: Math.floor(ry + rh / 2) };
    if (prev) {
      for (let x = Math.min(prev.cx, c.cx); x <= Math.max(prev.cx, c.cx); x++) carve(x, prev.cy);
      for (let y = Math.min(prev.cy, c.cy); y <= Math.max(prev.cy, c.cy); y++) carve(c.cx, y);
    }
    rooms.push(c);
    prev = c;
  }

  const startRoom = rooms[0];
  const start = { x: startRoom.cx, y: startRoom.cy, dir: 1 };

  const last = rooms[rooms.length - 1];
  tiles[last.cy * w + last.cx] = TILE_STAIRS;

  for (const r of rooms.slice(1, -1)) {
    if (rng() < 0.7) {
      const t = tiles[r.cy * w + r.cx];
      if (t === TILE_FLOOR) tiles[r.cy * w + r.cx] = TILE_CHEST;
    }
  }

  const dungeon: Dungeon = { name: "Sunken Vault — B1", w, h, tiles, start };
  addAmbiance(dungeon, seed);
  return dungeon;
}

export const DIR_VEC: { x: number; y: number }[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

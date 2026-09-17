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
  weapon?: string;
  armor?: string;
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

/* ------------------------------------------------------------------ */
/* Gear — weapons and armour found in chests                            */
/* ------------------------------------------------------------------ */

export interface Gear {
  id: string;
  name: string;
  kind: "weapon" | "armor";
  atk: number;
  def: number;
  tier: number;
  value: number;
}

export const GEAR: Gear[] = [
  // tier 1
  { id: "bronze_gladius", name: "Bronze Gladius", kind: "weapon", atk: 3, def: 0, tier: 1, value: 20 },
  { id: "leather_jerkin", name: "Leather Jerkin", kind: "armor", atk: 0, def: 2, tier: 1, value: 18 },
  { id: "ash_buckler", name: "Ash Buckler", kind: "armor", atk: 0, def: 3, tier: 1, value: 22 },
  // tier 2
  { id: "iron_falchion", name: "Iron Falchion", kind: "weapon", atk: 6, def: 0, tier: 2, value: 55 },
  { id: "smith_hammer", name: "Warden's Hammer", kind: "weapon", atk: 5, def: 1, tier: 2, value: 60 },
  { id: "chain_hauberk", name: "Chain Hauberk", kind: "armor", atk: 0, def: 5, tier: 2, value: 58 },
  // tier 3
  { id: "steel_warblade", name: "Steel Warblade", kind: "weapon", atk: 10, def: 0, tier: 3, value: 120 },
  { id: "emberfang", name: "Emberfang", kind: "weapon", atk: 9, def: 0, tier: 3, value: 130 },
  { id: "scale_mail", name: "Scale Mail", kind: "armor", atk: 0, def: 8, tier: 3, value: 115 },
  // tier 4
  { id: "runed_claymore", name: "Runed Claymore", kind: "weapon", atk: 15, def: 0, tier: 4, value: 240 },
  { id: "frostbrand", name: "Frostbrand", kind: "weapon", atk: 14, def: 1, tier: 4, value: 250 },
  { id: "runeplate", name: "Runeplate", kind: "armor", atk: 0, def: 12, tier: 4, value: 235 },
  // tier 5
  { id: "duskrend", name: "Duskrend", kind: "weapon", atk: 22, def: 0, tier: 5, value: 480 },
  { id: "dragonhide", name: "Dragonhide Coat", kind: "armor", atk: 0, def: 17, tier: 5, value: 470 },
  // tier 6
  { id: "starcleaver", name: "Starcleaver", kind: "weapon", atk: 30, def: 2, tier: 6, value: 900 },
  { id: "aegis_plate", name: "Aegis Plate", kind: "armor", atk: 0, def: 24, tier: 6, value: 880 },
];

export const GEAR_BY_ID: Record<string, Gear> = Object.fromEntries(GEAR.map((g) => [g.id, g]));

/** A gear drop suited to the depth reached. */
export function rollGear(floor: number, rng: () => number = Math.random): Gear {
  const maxTier = Math.min(6, Math.floor((floor + 2) / 3) + 1);
  const minTier = Math.max(1, maxTier - 2);
  const tier = minTier + Math.floor(rng() * (maxTier - minTier + 1));
  const pool = GEAR.filter((g) => g.tier === tier);
  return pool[Math.floor(rng() * pool.length)];
}

export function gearOf(m: Member, kind: "weapon" | "armor"): Gear | null {
  const id = kind === "weapon" ? m.weapon : m.armor;
  return id ? GEAR_BY_ID[id] ?? null : null;
}

/** Attack including any equipped weapon. */
export function gearAtk(m: Member): number {
  return m.atk + (gearOf(m, "weapon")?.atk ?? 0);
}

/** Defence including any equipped armour. */
export function gearDef(m: Member): number {
  return m.def + (gearOf(m, "armor")?.def ?? 0);
}

export function equipGear(m: Member, g: Gear): void {
  if (g.kind === "weapon") m.weapon = g.id;
  else m.armor = g.id;
}

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
  kind?: "dungeon" | "town";
}

export const TILE_FLOOR = 0;
export const TILE_WALL = 1;
export const TILE_CHEST = 2;
export const TILE_STAIRS = 3;
export const TILE_BARS = 4;
export const TILE_DOOR = 5;
export const TILE_KEY = 6;
export const TILE_VAULT = 7;
export const TILE_EXIT = 8;
export const TILE_EXIT2 = 9;

/** Tiles that block movement (and sight beyond, except bars which see through). */
export function isSolid(t: number): boolean {
  return t === TILE_WALL || t === TILE_BARS || t === TILE_DOOR || t === TILE_VAULT;
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
  | "grate"
  | "inn"
  | "blacksmith"
  | "magician"
  | "stall"
  | "tent"
  | "crate"
  | "well"
  | "lamp"
  | "banner"
  | "prop"
  | "wall"
  | "gate";

/** Decorative prop. For wall-mounted kinds, (x,y) is the wall cell and
 *  (dx,dy) points from the wall into the open room. */
export interface Decor {
  kind: DecorKind;
  x: number;
  y: number;
  dx: number;
  dy: number;
  model?: string;
  rot?: number;
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

  // the way back out to the world map, in the entry room
  let exitPos: { x: number; y: number } | null = null;
  {
    let bx = -1;
    let by = -1;
    let best = 99;
    for (let y = startRoom.y; y < startRoom.y + startRoom.h; y++) {
      for (let x = startRoom.x; x < startRoom.x + startRoom.w; x++) {
        if (x === start.x && y === start.y) continue;
        if (tiles[y * w + x] !== TILE_FLOOR) continue;
        const dd = Math.abs(x - start.x) + Math.abs(y - start.y);
        const score = Math.abs(dd - 3);
        if (score < best) {
          best = score;
          bx = x;
          by = y;
        }
      }
    }
    if (bx >= 0) {
      tiles[by * w + bx] = TILE_EXIT;
      exitPos = { x: bx, y: by };
      // spawn facing the surface gate
      const dx = bx - start.x;
      const dy = by - start.y;
      start.dir = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0;
    }
  }

  const doors: { x: number; y: number }[] = [];

  // vault door gating the stair room
  const vaultConn = connections[rooms.length - 2];
  let vaultDoor: { x: number; y: number } | null = null;
  if (vaultConn) {
    for (const idx of vaultConn) {
      const x = idx % w;
      const y = (idx / w) | 0;
      if (inAnyRoom(x, y)) continue;
      tiles[idx] = TILE_VAULT;
      vaultDoor = { x, y };
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

  // treasure room behind the vault door: the stair room is stacked with loot
  {
    let placed = 0;
    for (let tries = 0; tries < 60 && placed < 4; tries++) {
      const x = last.x + ri(last.w);
      const y = last.y + ri(last.h);
      const i = y * w + x;
      if (tiles[i] !== TILE_FLOOR) continue;
      if (Math.abs(x - last.cx) + Math.abs(y - last.cy) < 2) continue;
      tiles[i] = TILE_CHEST;
      placed++;
    }
  }

  const dungeon: Dungeon = { name: "Sunken Vault — B1", w, h, tiles, start };
  addAmbiance(dungeon, seed);

  // decor
  const decor: Decor[] = [];
  const mid = rooms.slice(1, -1);

  // cells either side of a room's corridor entrance (for flanking statues)
  const entryFlanks = (r: Room): [number, number][] => {
    for (let y = r.y; y < r.y + r.h; y++) {
      for (let x = r.x; x < r.x + r.w; x++) {
        for (const v of DIR_VEC) {
          const nx = x + v.x;
          const ny = y + v.y;
          if (nx >= r.x && nx < r.x + r.w && ny >= r.y && ny < r.y + r.h) continue;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (isSolid(tiles[ny * w + nx]) || inAnyRoom(nx, ny)) continue;
          const px = v.y;
          const py = v.x;
          const a: [number, number] = [x + px, y + py];
          const b: [number, number] = [x - px, y - py];
          const okA =
            a[0] >= r.x && a[0] < r.x + r.w && a[1] >= r.y && a[1] < r.y + r.h && tiles[a[1] * w + a[0]] === TILE_FLOOR;
          const okB =
            b[0] >= r.x && b[0] < r.x + r.w && b[1] >= r.y && b[1] < r.y + r.h && tiles[b[1] * w + b[0]] === TILE_FLOOR;
          if (okA && okB) return [a, b];
        }
      }
    }
    return [];
  };

  // the entry room and the stair room always get flanking gargoyles
  for (const r of [rooms[0], rooms[rooms.length - 1]]) {
    if (!r) continue;
    for (const [x, y] of entryFlanks(r)) decor.push({ kind: "gargoyle", x, y, dx: 0, dy: 0 });
  }

  // two gargoyles framing the surface exit (so the gate is flanked)
  if (exitPos) {
    const horiz = Math.abs(exitPos.x - start.x) >= Math.abs(exitPos.y - start.y);
    const cands: [number, number][] = horiz
      ? [
          [exitPos.x, exitPos.y - 1],
          [exitPos.x, exitPos.y + 1],
        ]
      : [
          [exitPos.x - 1, exitPos.y],
          [exitPos.x + 1, exitPos.y],
        ];
    for (const [gx, gy] of cands) {
      if (gx < 0 || gy < 0 || gx >= w || gy >= h) continue;
      if (tiles[gy * w + gx] !== TILE_FLOOR) continue;
      if (gx === start.x && gy === start.y) continue;
      decor.push({ kind: "gargoyle", x: gx, y: gy, dx: 0, dy: 0 });
    }
  }
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
      for (const [x, y] of entryFlanks(r)) decor.push({ kind: "gargoyle", x, y, dx: 0, dy: 0 });
    } else if (roll < 0.8) {
      const n = 1 + ri(2);
      for (let i = 0; i < n; i++) {
        const x = r.x + ri(r.w);
        const y = r.y + ri(r.h);
        if (tiles[y * w + x] === TILE_FLOOR) decor.push({ kind: "skeleton", x, y, dx: 0, dy: 0 });
      }
    }
  }
  // gargoyles flanking the vault door inside the treasure room
  if (vaultDoor) {
    for (let y = last.y; y < last.y + last.h; y++) {
      for (let x = last.x; x < last.x + last.w; x++) {
        const vx = vaultDoor.x - x;
        const vy = vaultDoor.y - y;
        if (Math.abs(vx) + Math.abs(vy) !== 1) continue;
        const px = vy;
        const py = vx;
        for (const s of [1, -1]) {
          const gx = x + px * s;
          const gy = y + py * s;
          if (
            gx >= last.x &&
            gx < last.x + last.w &&
            gy >= last.y &&
            gy < last.y + last.h &&
            tiles[gy * w + gx] === TILE_FLOOR
          ) {
            decor.push({ kind: "gargoyle", x: gx, y: gy, dx: 0, dy: 0 });
          }
        }
        y = last.y + last.h;
        break;
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

/**
 * A sprawling walled market town built from the HD town + fortification kits.
 * The grid stays coarse (for collision and movement); the decorative props are
 * placed at metre precision so the layout can breathe.
 */
export function generateTown(seed: number): Dungeon {
  const w = 41;
  const h = 41;
  const tiles = new Uint8Array(w * h).fill(TILE_FLOOR);
  const rng = mulberry32(seed);
  for (let x = 0; x < w; x++) {
    tiles[x] = TILE_WALL;
    tiles[(h - 1) * w + x] = TILE_WALL;
  }
  for (let y = 0; y < h; y++) {
    tiles[y * w] = TILE_WALL;
    tiles[y * w + w - 1] = TILE_WALL;
  }

  const decor: Decor[] = [];
  // metre-space placement helpers (buildTown multiplies cells by CS = 4 m)
  const M = 4;
  const add = (kind: DecorKind, xm: number, zm: number, model: string, rot = 0) =>
    decor.push({ kind, x: xm / M, y: zm / M, dx: 0, dy: 0, model, rot });

  const cx = Math.floor(w / 2);
  const C = cx * M; // 80 m — town centre
  const E = (h - 1) * M; // 160 m — wall line (outer edge)
  const WALL = M * 0.5; // 2 m

  // ---- fortification perimeter -------------------------------------------
  const span = E - WALL; // 158 m between the corner posts
  const seg = 5.89;
  const n = Math.max(1, Math.round(span / seg));
  const gateGap = 7; // metres cleared either side of a gate
  for (let i = 0; i <= n; i++) {
    const t = WALL + (span * i) / n;
    if (Math.abs(t - C) > gateGap) {
      add("wall", t, WALL, "wall_straight_hd", 0);
      add("wall", t, E, "wall_straight_hd", 0);
    }
    if (Math.abs(t - C) > gateGap) {
      add("wall", WALL, t, "wall_straight_hd", Math.PI / 2);
      add("wall", E, t, "wall_straight_hd", Math.PI / 2);
    }
  }
  for (const [x, z] of [
    [WALL, WALL],
    [E, WALL],
    [E, E],
    [WALL, E],
  ] as [number, number][]) {
    add("wall", x, z, "wall_corner_hd", 0);
  }
  for (const [x, z] of [
    [WALL + 9, WALL + 9],
    [E - 9, WALL + 9],
    [E - 9, E - 9],
    [WALL + 9, E - 9],
  ] as [number, number][]) {
    add("prop", x, z, "round_watchtower_hd", 0);
  }
  // south gate leads out to the world map; north gate back to the vault
  add("gate", C, E, "gate_open_hd", Math.PI);
  add("gate", C, WALL, "gate_open_hd", 0);

  const facing = (x: number, z: number) => Math.atan2(-(C - x), -(C - z));

  // ---- grand plaza: paving, fountain, balustrade, arcade ------------------
  const pave = 8.0;
  for (let ix = -2; ix <= 2; ix++) {
    for (let iz = -2; iz <= 2; iz++) {
      if (ix === 0 && iz === 0) continue; // fountain sits here
      add("prop", C + ix * pave, C + iz * pave, "castle_courtyard_plaza_hd", 0);
    }
  }
  add("well", C, C, "grand_royal_fountain_hd", rng() * Math.PI);
  for (const [dx, dz, r] of [
    [0, -7, 0],
    [0, 7, 0],
    [-7, 0, Math.PI / 2],
    [7, 0, Math.PI / 2],
  ] as [number, number, number][]) {
    add("prop", C + dx, C + dz, "courtyard_balustrade_hd", r);
  }
  for (const [dx, dz, r] of [
    [-17, -17, Math.PI / 4],
    [17, -17, -Math.PI / 4],
    [-17, 17, (3 * Math.PI) / 4],
    [17, 17, (-3 * Math.PI) / 4],
  ] as [number, number, number][]) {
    add("prop", C + dx, C + dz, "courtyard_arcade_hd", r);
  }

  // ---- cobbled roads from the gates to the plaza --------------------------
  const roadZ = (x: number, from: number, to: number) => {
    const steps = Math.max(1, Math.round(Math.abs(to - from) / 4.31));
    for (let i = 0; i <= steps; i++) add("prop", x, from + ((to - from) * i) / steps, "cobble_straight_hd", 0);
  };
  roadZ(C, C + 20, E - 8);
  roadZ(C, C - 20, WALL + 8);
  const roadX = (z: number, from: number, to: number) => {
    const steps = Math.max(1, Math.round(Math.abs(to - from) / 4.31));
    for (let i = 0; i <= steps; i++) add("prop", from + ((to - from) * i) / steps, z, "cobble_straight_hd", Math.PI / 2);
  };
  roadX(C, C + 20, E - 10);
  roadX(C, C - 20, WALL + 10);

  // ---- buildings ringing the plaza (fronts turned inward) ----------------
  const buildings: [DecorKind, string, number, number][] = [
    ["inn", "inn_hd", C, C - 40],
    ["inn", "tavern_hd", C - 31, C - 31],
    ["blacksmith", "blacksmith_open_forge_hd", C + 34, C - 12],
    ["magician", "magic_library_shop_hd", C + 24, C - 38],
    ["stall", "general_store_hd", C - 34, C - 8],
    ["prop", "house_large_hd", C + 30, C + 30],
    ["prop", "house_medium_hd", C - 40, C + 20],
    ["prop", "house_small_hd", C - 12, C - 44],
    ["prop", "house_small_hd", C - 22, C + 44],
    ["prop", "house_medium_hd", C + 46, C - 20],
    ["prop", "house_large_hd", C - 52, C + 40],
    ["prop", "house_medium_hd", C + 52, C + 40],
    ["prop", "house_small_hd", C + 40, C + 8],
    ["prop", "house_small_hd", C - 44, C - 34],
    ["prop", "house_large_hd", C + 62, C + 18],
    ["prop", "house_medium_hd", C - 62, C - 8],
    ["prop", "house_small_hd", C - 8, C - 62],
    ["prop", "house_medium_hd", C + 12, C + 62],
    ["prop", "house_small_hd", C - 62, C + 44],
    ["prop", "house_large_hd", C + 62, C + 56],
    ["prop", "house_small_hd", C + 34, C - 58],
    ["prop", "house_medium_hd", C - 30, C - 60],
    ["prop", "house_small_hd", C + 58, C - 40],
    ["prop", "house_medium_hd", C - 60, C + 58],
  ];
  // an outer ring of homes, fronts turned to the plaza
  for (let a = 0; a < 10; a++) {
    const ang = (a / 10) * Math.PI * 2 + 0.31;
    const r = 66 + rng() * 6;
    buildings.push([
      "prop",
      rng() < 0.55 ? "house_small_hd" : rng() < 0.8 ? "house_medium_hd" : "house_large_hd",
      C + Math.cos(ang) * r,
      C + Math.sin(ang) * r,
    ]);
  }
  for (const [kind, model, x, z] of buildings) add(kind, x, z, model, facing(x, z));

  // lamps marching along the four roads
  for (const t of [C + 30, C + 44, C + 58, C - 30, C - 44, C - 58]) {
    add("lamp", C - 3, t, "lamp_post");
    add("lamp", C + 3, t, "lamp_post");
    add("lamp", t, C - 3, "lamp_post");
    add("lamp", t, C + 3, "lamp_post");
  }

  // ---- market: two dense clusters of stalls ------------------------------
  const stalls: [string, number, number][] = [
    ["food_stall_hd", C - 9, C - 13],
    ["fruit_vegetable_stall_hd", C + 9, C - 13],
    ["merchant_stall_hd", C - 17, C - 4],
    ["cloth_stall_hd", C + 17, C - 4],
    ["potion_stall_hd", C - 17, C + 9],
    ["accessories_stall_hd", C + 17, C + 9],
    ["weapon_stall_hd", C - 8, C + 16],
    ["merchant_stall_hd", C + 8, C + 16],
    // second market lane by the south gate
    ["food_stall_hd", C - 6, C + 30],
    ["fruit_vegetable_stall_hd", C + 6, C + 30],
    ["merchant_stall_hd", C - 13, C + 38],
    ["cloth_stall_hd", C + 13, C + 38],
    ["potion_stall_hd", C - 6, C + 46],
    ["accessories_stall_hd", C + 6, C + 46],
  ];
  for (const [model, x, z] of stalls) add("stall", x, z, model, facing(x, z));

  // ---- street furniture & clutter ----------------------------------------
  for (let a = 0; a < 12; a++) {
    const ang = (a / 12) * Math.PI * 2;
    add("lamp", C + Math.cos(ang) * 21, C + Math.sin(ang) * 21, "lamp_post");
  }
  for (const [x, z, m, r] of [
    [C - 22, C + 22, "crate_stack", 0.3],
    [C + 22, C + 22, "barrel_cluster", 0],
    [C + 22, C - 22, "cart", 0.8],
    [C - 22, C - 22, "cart", 1.9],
    [C + 30, C + 2, "hay_bale", 0],
    [C - 30, C - 14, "hay_bale", 0.5],
    [C + 26, C + 30, "wood_fence", 0.3],
    [C - 26, C + 34, "wood_fence", 1.2],
    [C + 3, C - 24, "signpost", 0.6],
    [C - 3, C + 24, "signpost", -0.6],
    [C - 48, C - 30, "crate_stack", 0.2],
    [C + 48, C + 16, "barrel_cluster", 0.7],
    [C - 36, C + 36, "cart", 0.4],
    [C + 36, C - 36, "hay_bale", 1.0],
    [C + 56, C + 56, "barrel_cluster", 0.1],
    [C - 56, C + 8, "crate_stack", 0.9],
  ] as [number, number, string, number][]) {
    add("prop", x, z, m, r);
  }

  // ---- a pond in the south-east, with bridge + dock -----------------------
  const PX = C + 50;
  const PZ = C + 50;
  add("prop", PX, PZ, "stone_arch_bridge_hd", Math.PI / 4);
  add("prop", PX - 8, PZ + 8, "waterfront_dock_hd", Math.PI / 4);
  add("prop", PX + 8, PZ - 10, "wooden_bridge_hd", Math.PI / 4);

  // ---- trees: only off the streets, behind walls and buildings -----------
  // Trees are solid, so they must never land in a walkable lane.
  const treeSpots: [number, number][] = [];
  const blocked = (x: number, z: number): boolean =>
    Math.abs(x - C) < 8 ||
    Math.abs(z - C) < 8 ||
    (Math.abs(x - C) < 7 && z < WALL + 16 && z > 0) ||
    (Math.abs(x - C) < 7 && z > E - 16) ||
    (Math.abs(z - C) < 7 && x < WALL + 16) ||
    (Math.abs(z - C) < 7 && x > E - 16) ||
    buildings.some(([, , bx, bz]) => Math.hypot(x - bx, z - bz) < 11) ||
    stalls.some(([, bx, bz]) => Math.hypot(x - bx, z - bz) < 8) ||
    Math.hypot(x - (C + 50), z - (C + 50)) < 24;
  // scattered copses in the outer fields
  for (let i = 0; i < 1200 && treeSpots.length < 130; i++) {
    const x = WALL + 6 + rng() * (E - WALL - 12);
    const z = WALL + 6 + rng() * (E - WALL - 12);
    if (Math.hypot(x - C, z - C) < 38) continue;
    if (blocked(x, z)) continue;
    treeSpots.push([x, z]);
  }
  // a treeline hugging the inside of the walls (never in front of a gate)
  for (let t = WALL + 9; t <= E - 9; t += 6.5) {
    if (Math.abs(t - C) < 14) continue;
    treeSpots.push([t + (rng() - 0.5) * 2, WALL + 4.5 + rng() * 2]);
    treeSpots.push([t + (rng() - 0.5) * 2, E - 4.5 - rng() * 2]);
    treeSpots.push([WALL + 4.5 + rng() * 2, t + (rng() - 0.5) * 2]);
    treeSpots.push([E - 4.5 - rng() * 2, t + (rng() - 0.5) * 2]);
  }
  for (const [x, z] of treeSpots) add("prop", x, z, rng() < 0.6 ? "tree_small" : "tree_large", rng() * Math.PI * 2);

  // south gate back out to the world map; north road into the vault
  tiles[(h - 2) * w + cx] = TILE_EXIT;
  tiles[1 * w + cx] = TILE_EXIT2;

  const start = { x: cx, y: h - 6, dir: 0 };
  return { name: "Market Town", w, h, tiles, start, decor, kind: "town" };
}

export const DIR_VEC: { x: number; y: number }[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

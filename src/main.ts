import { GameCanvas, Input, Scene, startLoop } from "./engine";
import { Dungeon, TILE_WALL, addAmbiance, generateDungeon, makeParty } from "./data";
import { HallScene } from "./hall";
import { DungeonScene, Host, TitleScene, VIEW } from "./scenes";
import { View3D, ViewState } from "./view3d";
import { initModelAtlas, renderModelAtlas } from "./models";
import { loadTownKit } from "./townkit";
import { loadGargoyleKit } from "./gargoylekit";

/** A fixed cross-shaped corridor used only to eyeball the renderer. */
function makeTestDungeon(): Dungeon {
  const w = 9;
  const h = 9;
  const tiles = new Uint8Array(w * h).fill(TILE_WALL);
  for (let y = 1; y < h - 1; y++) tiles[y * w + 4] = 0;
  for (let x = 1; x < w - 1; x++) tiles[4 * w + x] = 0;
  const d: Dungeon = { name: "Test Corridor", w, h, tiles, start: { x: 4, y: 6, dir: 0 } };
  addAmbiance(d, 0x7e57);
  return d;
}

const canvasEl = document.getElementById("c") as HTMLCanvasElement;
const viewEl = document.getElementById("view") as HTMLCanvasElement;
const gc = new GameCanvas(canvasEl);
const input = new Input();
initModelAtlas();
loadTownKit();
loadGargoyleKit();

const params = new URLSearchParams(location.search);
const mode = params.get("scene");
const seed = Number(params.get("seed") ?? 0xc0ffee);
const v3d = mode === "dungeon" || mode === "testroom" ? new View3D(viewEl) : null;
if (v3d) {
  if (params.get("proj") === "rect") v3d.cyl = false;
  if (params.get("proj") === "cyl") v3d.cyl = true;
  const fovParam = Number(params.get("fov"));
  if (Number.isFinite(fovParam) && fovParam > 0) v3d.halfFov = (fovParam * Math.PI) / 360;
}

const host: Host = {
  party: makeParty(),
  inventory: { draught: 2, dew: 1 },
  gold: 0,
  dungeon: mode === "testroom" ? makeTestDungeon() : generateDungeon(seed),
  gpu: v3d ? v3d.ok : false,
  setScene(s: Scene) {
    current = s;
    s.enter?.();
  },
};

let current: Scene;
if (mode === "hall") {
  current = new HallScene(host);
} else if (mode === "floor") {
  current = new HallScene(host, host.dungeon);
} else if (mode === "world") {
  current = new HallScene(host, host.dungeon);
} else if (mode === "town") {
  current = new HallScene(host);
} else if (mode === "dungeon" || mode === "testroom") {
  const ds = new DungeonScene(host);
  const pose = params.get("pose");
  if (pose) {
    const [x, y, d] = pose.split(",").map(Number);
    ds.setPose(x, y, d);
  }
  current = ds;
} else {
  current = new TitleScene(host);
}

startLoop(
  (dt) => {
    try {
      renderModelAtlas(dt);
      current.update(dt, input);
      input.endFrame();
    } catch (err) {
      document.title = "UPDERR " + (err as Error).message;
    }
  },
  () => {
    try {
      const ctx = gc.ctx;
      ctx.setTransform(gc.scaleFactor, 0, 0, gc.scaleFactor, 0, 0);
      ctx.imageSmoothingEnabled = false;
      current.render(ctx);

      const fn = (current as unknown as { viewState?: () => ViewState | null }).viewState;
      const vs = fn ? fn.call(current) : null;
      const glr = (current as unknown as {
        glRender?: (v: HTMLCanvasElement, u: HTMLCanvasElement) => void;
      }).glRender;

      if (glr) {
        viewEl.style.display = "block";
        glr.call(current, viewEl, canvasEl);
      } else if (vs && v3d && v3d.ok) {
        viewEl.style.display = "block";
        v3d.layout(canvasEl, VIEW);
        v3d.render(vs);
      } else {
        viewEl.style.display = "none";
      }
    } catch (err) {
      document.title = "RENDERERR " + (err as Error).message;
    }
  }
);

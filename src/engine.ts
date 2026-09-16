export const W = 384;
export const H = 216;

export type Action =
  | "up"
  | "down"
  | "left"
  | "right"
  | "confirm"
  | "cancel"
  | "map";

const KEYMAP: Record<string, Action> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  Enter: "confirm",
  KeyZ: "confirm",
  Space: "confirm",
  Escape: "cancel",
  KeyX: "cancel",
  KeyM: "map",
};

export class Input {
  private down = new Set<Action>();
  private pressed = new Set<Action>();

  constructor(target: Window = window) {
    target.addEventListener("keydown", (e) => {
      const a = KEYMAP[e.code];
      if (!a) return;
      e.preventDefault();
      if (!e.repeat && !this.down.has(a)) this.pressed.add(a);
      this.down.add(a);
    });
    target.addEventListener("keyup", (e) => {
      const a = KEYMAP[e.code];
      if (!a) return;
      e.preventDefault();
      this.down.delete(a);
    });
    target.addEventListener("blur", () => this.down.clear());
  }

  held(a: Action): boolean {
    return this.down.has(a);
  }
  justPressed(a: Action): boolean {
    return this.pressed.has(a);
  }

  /** Called once per frame at the end of update. */
  endFrame(): void {
    this.pressed.clear();
  }
}

export class GameCanvas {
  readonly view: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  private scale = 1;

  constructor(view: HTMLCanvasElement) {
    this.view = view;
    const ctx = view.getContext("2d");
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize(): void {
    const s = Math.max(
      1,
      Math.floor(Math.min(window.innerWidth / W, window.innerHeight / H))
    );
    this.scale = s;
    this.view.width = W * s;
    this.view.height = H * s;
    this.view.style.width = `${W * s}px`;
    this.view.style.height = `${H * s}px`;
    this.ctx.imageSmoothingEnabled = false;
  }

  get scaleFactor(): number {
    return this.scale;
  }
}

/** Deterministic PRNG (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Scene {
  enter?(): void;
  update(dt: number, input: Input): void;
  render(ctx: CanvasRenderingContext2D): void;
}

export function startLoop(
  update: (dt: number) => void,
  render: () => void
): void {
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    render();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

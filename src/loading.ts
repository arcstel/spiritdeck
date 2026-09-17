import { Scene } from "./engine";
import { C, rect, textCenter } from "./render";
import { VERSION } from "./version";
import { assetsPending, kitsReady } from "./assets";

interface Sink {
  setScene(s: Scene): void;
}

interface Warmable {
  preload?: () => void;
}

const TIMEOUT = 12;

/**
 * Shown while the next area's graphics load. Nothing of the new scene is
 * revealed until every asset has settled and a warm-up frame has compiled the
 * shaders and uploaded the textures, so the player never watches it pop in.
 */
export class LoadingScene implements Scene {
  private target: Scene | null = null;
  private built = false;
  private phase = 0;
  private t = 0;
  private waited = 0;
  private minShow: number;
  private debug: boolean;
  private frames = 0;

  constructor(
    private host: Sink,
    private prepare: () => Scene,
    private label = "L O A D I N G"
  ) {
    const q = new URLSearchParams(location.search);
    const ms = q.get("loadms");
    this.minShow = ms === null ? 0.4 : Math.max(0, Number(ms) || 0) / 1000;
    this.debug = q.get("loaddebug") === "1";
  }

  enter(): void {
    this.t = 0;
    this.waited = 0;
    this.frames = 0;
  }

  update(dt: number): void {
    this.t += dt;
    this.waited += dt;
    this.frames++;
    const waiting = this.waited < TIMEOUT;

    if (!this.built) {
      if ((!kitsReady() || assetsPending() > 0) && waiting) return;
      this.target = this.prepare();
      this.built = true;
      this.waited = 0;
      return;
    }
    if (assetsPending() > 0 && waiting) return;

    if (this.phase === 0) {
      this.phase = 1;
      this.waited = 0;
      (this.target as unknown as Warmable).preload?.();
      return;
    }
    if (this.phase === 1) {
      this.phase = 2;
      this.waited = 0;
      (this.target as unknown as Warmable).preload?.();
      return;
    }
    if (this.target && this.t >= this.minShow && this.frames > 3) this.host.setScene(this.target);
  }

  render(ctx: CanvasRenderingContext2D): void {
    rect(ctx, 0, 0, 384, 216, "#05050a");
    const a = 0.7 + 0.3 * Math.sin(this.t * 2.0);
    ctx.globalAlpha = a;
    textCenter(ctx, this.label, 192, 100, C.gold, 16);
    ctx.globalAlpha = 1;
    if (this.debug) {
      textCenter(ctx, `kits ${kitsReady() ? "ok" : "wait"}  assets ${assetsPending()}`, 192, 124, C.dim, 8);
      textCenter(ctx, `phase ${this.phase}  ${(this.t).toFixed(1)}s`, 192, 134, C.dim, 8);
    }
    textCenter(ctx, VERSION, 192, 210, C.dim, 8);
  }
}

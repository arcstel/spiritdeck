import { gargoyleReady } from "./gargoylekit";
import { townKitReady } from "./townkit";

/**
 * A tiny global counter of in-flight asset loads (textures, etc). Scenes call
 * track() before kicking off a load and the returned fn once it settles, so a
 * loading screen can wait until the next area's graphics are fully in memory.
 */
let pending = 0;

export function track(): () => void {
  pending++;
  let settled = false;
  return () => {
    if (settled) return;
    settled = true;
    pending--;
  };
}

export function assetsPending(): number {
  return pending;
}

/** True once the async model kits have finished loading (or given up). */
export function kitsReady(): boolean {
  return townKitReady() && gargoyleReady();
}

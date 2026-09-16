import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const BASE = import.meta.env.BASE_URL;

const NAMES = ["gargoyle_horned_sentinel", "gargoyle_winged_lion", "gargoyle_skull_watcher"];

const cache = new Map<string, THREE.Object3D>();
let started = false;
let remaining = 0;

/** Load the three gargoyle statue variants (Z-up, ground-centered, metres). */
export function loadGargoyleKit(): void {
  if (started) return;
  started = true;
  remaining = NAMES.length;
  const loader = new GLTFLoader();
  for (const name of NAMES) {
    loader.load(
      `${BASE}models/gargoyles/${name}.glb`,
      (gltf) => {
        const root = gltf.scene;
        root.rotation.x = -Math.PI / 2;
        root.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh && m.material) {
            const mats = Array.isArray(m.material) ? m.material : [m.material];
            for (const mat of mats) {
              const std = mat as THREE.MeshStandardMaterial;
              std.vertexColors = false;
              std.color = new THREE.Color(0x9a978c);
              std.roughness = 0.9;
              std.metalness = 0.0;
              std.map = null;
              std.needsUpdate = true;
            }
          }
        });
        const pivot = new THREE.Group();
        pivot.add(root);
        cache.set(name, pivot);
        remaining--;
      },
      undefined,
      () => {
        remaining--;
      }
    );
  }
}

export function gargoyleReady(): boolean {
  return cache.size > 0;
}

/** A clone of a specific gargoyle variant (1..3), or null if not loaded. */
export function gargoyleModel(variant: number): THREE.Object3D | null {
  const name = NAMES[((variant % NAMES.length) + NAMES.length) % NAMES.length];
  const m = cache.get(name);
  return m ? m.clone(true) : null;
}

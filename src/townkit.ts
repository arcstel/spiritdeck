import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const BASE = import.meta.env.BASE_URL;

export const TOWN_MODULES = [
  "inn",
  "tavern",
  "blacksmith_shop",
  "magic_shop",
  "general_store",
  "town_house_A",
  "town_house_B",
  "inn_hd",
  "blacksmith_hd",
  "magic_shop_hd",
  "town_wall_gate",
  "town_wall_straight",
  "cobblestone_square",
  "town_fountain",
  "well",
  "lamp_post",
  "signpost",
  "cart",
  "barrel_cluster",
  "crate_stack",
  "food_stall",
  "merchant_stall",
  "cloth_stall",
  "potion_stall",
  "general_goods_stall",
  "hay_bale",
  "wood_fence",
  "wooden_bridge",
] as const;

const cache = new Map<string, THREE.Object3D>();
let started = false;
let remaining = 0;

/** Kick off async loading of the medieval town kit (Z-up, 4 m grid). */
export function loadTownKit(): void {
  if (started) return;
  started = true;
  remaining = TOWN_MODULES.length;
  const loader = new GLTFLoader();
  for (const name of TOWN_MODULES) {
    loader.load(
      `${BASE}models/town/${name}.glb`,
      (gltf) => {
        const root = gltf.scene;
        root.rotation.x = -Math.PI / 2;
        if (name === "town_wall_straight" || name === "town_wall_gate") {
          root.scale.set(8 / 10.27, 1, 1);
        }
        root.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) {
            m.castShadow = false;
            m.receiveShadow = false;
            if (m.material) {
              const mats = Array.isArray(m.material) ? m.material : [m.material];
              for (const mat of mats) {
                const std = mat as THREE.MeshStandardMaterial;
                if (std.map) std.map.colorSpace = THREE.SRGBColorSpace;
                std.roughness = Math.min(1, (std.roughness ?? 1) * 1.0);
              }
            }
          }
        });
        // wrap so the Z-up correction lives inside a clean yaw pivot
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

export function townKitReady(): boolean {
  return remaining === 0 && cache.size > 0;
}

/** Returns a fresh clone of a kit model (already Z-up corrected), or null. */
export function townModel(name: string): THREE.Object3D | null {
  const m = cache.get(name);
  return m ? m.clone(true) : null;
}

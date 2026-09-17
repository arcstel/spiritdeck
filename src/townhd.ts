import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const BASE = import.meta.env.BASE_URL;

/** Buildings + market stalls from the Town Buildings/Market HD kit. */
export const TOWN_HD = [
  "house_small_hd",
  "house_medium_hd",
  "house_large_hd",
  "blacksmith_open_forge_hd",
  "inn_hd",
  "magic_library_shop_hd",
  "general_store_hd",
  "tavern_hd",
  "food_stall_hd",
  "merchant_stall_hd",
  "cloth_stall_hd",
  "potion_stall_hd",
  "weapon_stall_hd",
  "accessories_stall_hd",
  "fruit_vegetable_stall_hd",
] as const;

/** Walls, gates, towers, paving and courtyard pieces from the Fortifications kit. */
export const FORT_HD = [
  "wall_straight_hd",
  "wall_corner_hd",
  "gate_closed_hd",
  "gate_open_hd",
  "round_watchtower_hd",
  "fortification_stairs_hd",
  "battlement_hd",
  "castle_courtyard_plaza_hd",
  "cobble_plaza_hd",
  "cobble_straight_hd",
  "cobble_corner_hd",
  "cobble_crossroad_hd",
  "cobble_t_junction_hd",
  "dirt_path_hd",
  "grass_edge_path_hd",
  "courtyard_arcade_hd",
  "courtyard_balustrade_hd",
  "grand_royal_fountain_hd",
  "stone_arch_bridge_hd",
  "wooden_bridge_hd",
  "waterfront_dock_hd",
] as const;

const cache = new Map<string, THREE.Object3D>();
let started = false;
let remaining = 0;

function tune(root: THREE.Object3D): void {
  // the kits are Z-up; tilt into our Y-up world inside a clean yaw pivot
  root.rotation.x = -Math.PI / 2;
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    m.castShadow = true;
    m.receiveShadow = true;
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    for (const mat of mats) {
      const std = mat as THREE.MeshStandardMaterial;
      if (!std || !std.isMeshStandardMaterial) continue;
      std.vertexColors = true;
      std.color.setRGB(1, 1, 1);
      if (mat.name.toLowerCase().includes("fountain")) {
        std.roughness = 0.55;
        std.metalness = 0.05;
      } else {
        std.roughness = 0.9;
        std.metalness = 0;
      }
      std.needsUpdate = true;
    }
  });
}

function register(name: string, folder: string, loader: GLTFLoader): void {
  loader.load(
    `${BASE}models/${folder}/${name}.glb`,
    (gltf) => {
      try {
        const root = gltf.scene;
        tune(root);
        const pivot = new THREE.Group();
        pivot.add(root);
        cache.set(name, pivot);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("townhd load failed", name, err);
      } finally {
        remaining--;
      }
    },
    undefined,
    () => {
      remaining--;
    }
  );
}

/** Kick off loading of both HD kits. */
export function loadTownHd(): void {
  if (started) return;
  started = true;
  remaining = TOWN_HD.length + FORT_HD.length;
  const loader = new GLTFLoader();
  for (const n of TOWN_HD) register(n, "townhd", loader);
  for (const n of FORT_HD) register(n, "fort", loader);
}

export function townHdReady(): boolean {
  return started && remaining === 0 && cache.size > 0;
}

/** A fresh clone of an HD module (Z-up corrected), or null if not loaded yet. */
export function hdModel(name: string): THREE.Object3D | null {
  const m = cache.get(name);
  return m ? m.clone(true) : null;
}

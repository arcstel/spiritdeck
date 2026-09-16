import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

/**
 * Renders the party's 3D models into one atlas canvas (one square per member).
 * The 2D HUD blits sub-rects of that canvas inside the holographic frames.
 */

const SIZE = 160;
const SLOTS = 4;
const BASE = import.meta.env.BASE_URL;

/** Party slot order must match makeParty() in data.ts. */
const ORDER = ["arcstel", "orin", "nemne", "vesper"];

const MODEL_FILE: Record<string, string> = {
  arcstel: "models/blue_mage_avatar.obj",
  orin: "models/king_warrior_editable.obj",
  nemne: "models/celestial_sorceress/celestial_sorceress_full_body.obj",
  vesper: "models/ethereal_sorceress_avatar.obj",
};

const TINT: Record<string, number> = {
  arcstel: 0x6aa8ff,
  orin: 0xd8c08a,
  nemne: 0xe6ecff,
  vesper: 0x9fe6b0,
};

/** Some Meshy OBJs are Z-up; tip them upright for the bust portrait. */
const ROT_X: Record<string, number> = {
  arcstel: 0,
  orin: 0,
  nemne: 0,
  vesper: 0,
};

interface Entry {
  scene: THREE.Scene;
  pivot: THREE.Object3D;
  loaded: boolean;
}

class ModelAtlas {
  readonly canvas: HTMLCanvasElement;
  ready = false;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private entries: Entry[] = [];
  private t = 0;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = SIZE * SLOTS;
    this.canvas.height = SIZE;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setScissorTest(true);
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.05, 200);
    this.camera.position.set(0, 0, 3.2);
    this.camera.lookAt(0, 0, 0);

    const loader = new OBJLoader();
    ORDER.forEach((id, i) => {
      const scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const key = new THREE.DirectionalLight(0xeaf2ff, 2.4);
      key.position.set(1.4, 1.8, 2.2);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x66ccff, 1.6);
      rim.position.set(-1.6, 0.6, -1.4);
      scene.add(rim);
      const pivot = new THREE.Object3D();
      scene.add(pivot);
      this.entries.push({ scene, pivot, loaded: false });

      loader.load(
        `${BASE}${MODEL_FILE[id]}`,
        (obj) => {
          obj.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.material = new THREE.MeshStandardMaterial({
                color: TINT[id],
                roughness: 0.55,
                metalness: 0.05,
              });
            }
          });
          obj.rotation.x = ROT_X[id] ?? 0;
          obj.updateMatrixWorld(true);
          const box2 = new THREE.Box3().setFromObject(obj);
          const size2 = box2.getSize(new THREE.Vector3());
          const center2 = box2.getCenter(new THREE.Vector3());
          obj.position.sub(center2);
          pivot.add(obj);
          const h = size2.y || Math.max(size2.x, size2.z) || 1;
          pivot.scale.setScalar(1.6 / h);
          this.entries[i].loaded = true;
          if (this.entries.every((e) => e.loaded)) this.ready = true;
        },
        undefined,
        () => {
          // leave unloaded; the HUD falls back to the 2D portrait
        }
      );
    });
  }

  render(dt: number): void {
    this.t += dt;
    for (let i = 0; i < SLOTS; i++) {
      const e = this.entries[i];
      if (!e || !e.loaded) continue;
      e.pivot.rotation.y = 0;
      this.renderer.setViewport(i * SIZE, 0, SIZE, SIZE);
      this.renderer.setScissor(i * SIZE, 0, SIZE, SIZE);
      this.renderer.render(e.scene, this.camera);
    }
  }
}

let atlas: ModelAtlas | null = null;

export function initModelAtlas(): void {
  if (!atlas) atlas = new ModelAtlas();
}

export function renderModelAtlas(dt: number): void {
  atlas?.render(dt);
}

export function getModelAtlas(): { canvas: HTMLCanvasElement; ready: boolean } | null {
  return atlas ? { canvas: atlas.canvas, ready: atlas.ready } : null;
}

export function modelSlot(memberId: string): number {
  return ORDER.indexOf(memberId);
}

export const MODEL_SIZE = SIZE;

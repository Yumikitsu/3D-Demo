import { Object3D, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";


export function ModelLoader(scene:Scene, path:string): Object3D | null {
  const loader = new GLTFLoader();
  let model: Object3D | null = null;

  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      console.log(`Model loaded: ${path}`);
    },
    (progress) => {
      console.log(`Loading ${path}: ${(progress.loaded / (progress.total || 1)) * 100}%`);
    },
    (error) => {
      console.error(`Error loading model ${path}:`, error);
    }
  )

  return model;
}
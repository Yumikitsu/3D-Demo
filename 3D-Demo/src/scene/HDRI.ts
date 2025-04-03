import { EquirectangularReflectionMapping, Scene } from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";

// Function for loading an HDRI to the scene.
export function loadHDRI(scene:Scene, path:string) {
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(path, (texture) => {
    // Set the texture as the scene's environment map
    scene.background = texture;
    scene.environment = texture;
    texture.mapping = EquirectangularReflectionMapping;
    
    texture.dispose();
  });
}
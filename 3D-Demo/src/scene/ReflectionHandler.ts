import { EquirectangularReflectionMapping, Mesh, Object3D, Scene } from "three";
import { Reflector, RGBELoader } from "three/examples/jsm/Addons.js";

// Function for applying reflection to mirror surfaces
export function applyReflection(models:Object3D[], scene:Scene): Reflector[] {
  let reflectors:Reflector[] = [];
  models.forEach((model) => {
    model.traverse((child) => {
      if (child instanceof Mesh) {
        // Apply this effect on materials with metalness 1 and roughness 0.
        if (child.material.metalness === 1 && child.material.roughness === 0) {
          console.log(`Applying mirror effect to: ${child.name}`);
  
          const reflector = new Reflector(child.geometry, {
            clipBias: 0.5,
            color: 0xDDFFE1FF, // Green mirror tint
          });
  
          reflector.position.copy(child.position);
          reflector.rotation.copy(child.rotation);
          scene.add(reflector);
          reflectors.push(reflector);
  
          // Hide the original part of the model
          child.visible = false;
        }
      }
    });
  })
  return reflectors;
}

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
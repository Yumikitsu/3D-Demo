import { Object3D, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

// Class that loads and stores model objects.
export class ModelHandler {
  public models:Object3D[] = [];

  constructor() {}

  // Method for loading all models at once
  public async loadAllModels(scene:Scene) {
    const modelPaths = [
    // House
    "/models/BackWall.glb",
    "/models/FrontWall.glb",
    "/models/LeftWall.glb",
    "/models/RightWall.glb",
    "/models/Roof.glb",
    "/models/Floor.glb",

    // Bed
    "/models/Bed.glb",
    "/models/PillowL.glb",
    "/models/PillowR.glb",
    "/models/Bedsheet.glb",

    // Closet
    "/models/Closet.glb",
    "/models/ClosetDoorL.glb",
    "/models/ClosetDoorR.glb",

    // Mirror
    "/models/Mirror.glb",
    
    // Desk + Desk Lamp
    "/models/Desk.glb",
    "/models/DeskLamp.glb",

    // Chair
    "/models/Chair.glb",

    // Door
    "/models/Door.glb",

    // Window
    "/models/Window.glb",
    
    // Carpet
    "/models/Carpet.glb",

    // Ceiling Lamp
    "/models/CeilingLamp.glb"
    ];

    // Await for all the models to finish loading
    await Promise.all(modelPaths.map(path => this.addModel(scene, path)));
  }

  // Method for adding a single model
  public async addModel(scene:Scene, path:string): Promise<void> {
    try {
      const model = await this.ModelLoader(scene, path);
      if(model) {
        this.models.push(model);
      }
    } catch (error) {
      console.error(`Error loading model from ${path}`, error);
    }
  }

  // Method for loading a GLB file
  private ModelLoader(scene:Scene, path:string): Promise<Object3D> {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          scene.add(model);
          console.log(`Model loaded: ${path}`);
          resolve(model);
        },
        (progress) => {
          console.log(`Loading ${path}: ${(progress.loaded / (progress.total || 1)) * 100}%`);
        },
        (error) => {
          console.error(`Error loading model ${path}:`, error);
          reject(error);
        }
      )
    })
  }
}
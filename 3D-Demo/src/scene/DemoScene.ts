import { PerspectiveCamera, Scene, WebGLRenderer, AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { ModelHandler } from "./ModelHandler";
import { loadHDRI } from "./HDRI";

class DemoScene {
  private static _instance = new DemoScene();
  public static get instance(){
    return this._instance;
  }
  private _width:number;
  private _height:number;
  private _renderer: WebGLRenderer;
  private _camera:PerspectiveCamera;
  private _modelHandler:ModelHandler;

  // Three.js Scene
  private readonly _scene = new Scene();

  private constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;

    this._renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(this._width, this._height);
    // Access target HTML element
    const targetElement = document.querySelector<HTMLDivElement>("#app");
    if(!targetElement) {
      throw "Unable to access target element";
    }
    targetElement.appendChild(this._renderer.domElement);

    // Camera setup
    const aspectRatio = this._width / this._height;
    this._camera = new PerspectiveCamera(90, aspectRatio, 0.01, 1000);
    this._camera.position.set(8.5, 3, 0);

    // Directional light
    const light = new AmbientLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    this._scene.add(light);

    // Control the camera with your mouse
    new OrbitControls(this._camera, this._renderer.domElement);

    // Add an HDRI to the scene
    //loadHDRI(this._scene, "/hdri/pretoria_gardens_1k.hdr");

    // Load all models to the scene
    this._modelHandler = new ModelHandler;
    this.loadModels();

    // Listen to size changes
    window.addEventListener("resize", this.resize, false);
  }

  private async loadModels() {
    await this._modelHandler.loadAllModels(this._scene);
  }

  // Resize the camera and window based on the browser
  private resize = () => {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._renderer.setSize(this._width, this._height);
    this._camera.aspect = this._width / this._height;
    this._camera.updateProjectionMatrix();
  }

  // Render everything in the Three.js scene that the camera can see
  public render = () => {
    requestAnimationFrame(this.render);
    this._renderer.render(this._scene, this._camera);
  }
}

export default DemoScene;
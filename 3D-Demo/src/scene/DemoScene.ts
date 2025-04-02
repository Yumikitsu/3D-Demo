import { PerspectiveCamera, BoxGeometry, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class DemoScene {
  private static _instance = new DemoScene();
  public static get instance(){
    return this._instance;
  }
  private _width:number;
  private _height:number;
  private _renderer: WebGLRenderer;
  private _camera:PerspectiveCamera;

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
    this._camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    this._camera.position.set(0, 0, 3);

    // Control the camera with your mouse
    new OrbitControls(this._camera, this._renderer.domElement);

    // Listen to size changes
    window.addEventListener("resize", this.resize, false);
  }

  // Resize the camera and window based on the browser
  private resize = () => {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._renderer.setSize(this._width, this._height);
    this._camera.aspect = this._width / this._height;
    this._camera.updateProjectionMatrix();
  }

  // Load a model to render
  public load = () => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xf0000f });
    const cube = new Mesh(geometry, material);
    this._scene.add(cube);
  }

  // Render everything in the Three.js scene that the camera can see
  public render = () => {
    requestAnimationFrame(this.render);
    this._renderer.render(this._scene, this._camera);
  }
}

export default DemoScene;
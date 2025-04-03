import { PerspectiveCamera, Scene, WebGLRenderer, PCFSoftShadowMap, Clock } from "three";
import { ModelHandler } from "./ModelHandler";
import { loadHDRI } from "./HDRI";
import { setupLights } from "./LightHandler";
import { MovementHandler } from "./MovementHandler";

class DemoScene {
  private static _instance = new DemoScene();
  public static get instance() {
    return this._instance;
  }
  private width:number;
  private height:number;
  private renderer: WebGLRenderer;
  private camera:PerspectiveCamera;
  private modelHandler:ModelHandler;
  private movementHandler:MovementHandler;

  // Three.js Scene
  private readonly scene = new Scene();

  // Clock and Delta Time
  private readonly clock = new Clock();
  private deltaTime = 0;

  private constructor() {
    // Set the width and height based on the browser
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Initialize the renderer
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    // Enable shadow mapping
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    // Define the size of the screen
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    // Access target HTML element
    const targetElement = document.querySelector<HTMLDivElement>("#app");
    if(!targetElement) {
      throw "Unable to access target element";
    }
    targetElement.appendChild(this.renderer.domElement);

    // Camera setup
    const aspectRatio = this.width / this.height;
    this.camera = new PerspectiveCamera(90, aspectRatio, 0.01, 1000);
    this.camera.position.set(8.5, 3, 0);
    this.camera.lookAt(0, 0, 0);
    this.movementHandler = new MovementHandler;

    // Setup lights
    setupLights(this.scene);

    // Add an HDRI to the scene
    //loadHDRI(this.scene, "/hdri/pretoria_gardens_1k.hdr");

    // Load all models to the scene
    this.modelHandler = new ModelHandler;
    this.loadModels();

    // Listen to size changes
    window.addEventListener("resize", this.resize, false);

    // Listen to pressed and released keys
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    // Listen to mouse click and movement
    window.addEventListener("click", this.lockPointer);
    window.addEventListener("mousemove", this.onMouseMove)
  }

  // Lock the pointer to the screen
  private lockPointer = () => {
    document.body.requestPointerLock();
  }

  // Handle mouse movements
  private onMouseMove = (event: MouseEvent) => {
    if (document.pointerLockElement === document.body) {
      this.movementHandler.updateCameraRotation(this.camera, event, this.deltaTime);
    }
  }

  // Handle pressed keys
  private onKeyDown = (event: KeyboardEvent) => {
    switch(event.key) {
      case "w": this.movementHandler.moveForward = true; break;
      case "s": this.movementHandler.moveBackward = true; break;
      case "a": this.movementHandler.moveLeft = true; break;
      case "d": this.movementHandler.moveRight = true; break;
    }
  }

  // Handle released keys
  private onKeyUp = (event: KeyboardEvent) => {
    switch(event.key) {
      case "w": this.movementHandler.moveForward = false; break;
      case "s": this.movementHandler.moveBackward = false; break;
      case "a": this.movementHandler.moveLeft = false; break;
      case "d": this.movementHandler.moveRight = false; break;
    }
  }
  

  // Load all models
  private async loadModels() {
    await this.modelHandler.loadAllModels(this.scene);
  }

  // Resize the camera and window based on the browser
  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  // Render everything in the Three.js scene that the camera can see
  public render = () => {
    requestAnimationFrame(this.render);
    this.deltaTime = this.clock.getDelta();
    this.movementHandler.updateCameraMovement(this.camera, this.deltaTime);
    this.renderer.render(this.scene, this.camera);
  }
}

export default DemoScene;
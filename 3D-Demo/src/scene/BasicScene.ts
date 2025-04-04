import { PerspectiveCamera, Scene, WebGLRenderer, PCFSoftShadowMap, Clock, Object3D, PlaneGeometry, MeshStandardMaterial, Mesh, SphereGeometry, BoxGeometry, MeshPhongMaterial } from "three";
import { setupBasicLights } from "./LightHandler";
import { MovementHandler } from "./MovementHandler";

class BasicScene {
  private static _instance = new BasicScene();
  public static get instance() {
    return this._instance;
  }
  private width:number;
  private height:number;
  private renderer: WebGLRenderer;
  private camera:PerspectiveCamera;
  private movementHandler:MovementHandler;
  private cube:Mesh | null = null;

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
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 5, 0);
    this.movementHandler = new MovementHandler;

    // Setup lights
    setupBasicLights(this.scene);

    // Load geometry to the scene
    this.loadGeometry();
    // Another cube that can rotate
    const cubeGeometry = new BoxGeometry(1.5, 1.5, 1.5);
    const cubeMaterial = new MeshPhongMaterial({
      color: 0x00ff00,
      shininess: 80,
      specular: 0x222222
    });
    this.cube = new Mesh(cubeGeometry, cubeMaterial);
    this.cube.position.set(-20, 0, 0);
    this.cube.castShadow = true;
    this.scene.add(this.cube);

    // Listen to size changes
    window.addEventListener("resize", this.resize, false);

    // Listen to pressed and released keys
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    // Listen to mouse click and movement
    window.addEventListener("click", this.lockPointer);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  // Lock the pointer to the screen
  private lockPointer = () => {
    document.body.requestPointerLock();
  }

  // Handle mouse movements
  private onMouseMove = (event:MouseEvent) => {
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
  private loadGeometry() {
    // Create ground mesh that receives shadows
    const groundGeometry = new PlaneGeometry(70, 40);
    const groundMaterial = new MeshStandardMaterial({ color: 0xffffff });
    const ground = new Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Create objects to circle the middle
    const cubeGeometry = new BoxGeometry(1.5, 1.5, 1.5);
    const cubeMaterial = new MeshStandardMaterial({ color: 0x0077ff });
    const cube1 = new Mesh(cubeGeometry, cubeMaterial);
    cube1.position.set(3, 0, 3);
    cube1.castShadow = true;
    const cube2 = new Mesh(cubeGeometry, cubeMaterial);
    cube2.position.set(-3, 0, -3);
    cube2.castShadow = true;
    const cube3 = new Mesh(cubeGeometry, cubeMaterial);
    cube3.position.set(-3, 0, 3);
    cube3.castShadow = true;
    const cube4 = new Mesh(cubeGeometry, cubeMaterial);
    cube4.position.set(3, 0, -3);
    cube4.castShadow = true;
    const cube5 = new Mesh(cubeGeometry, cubeMaterial);
    cube5.position.set(3, 0, 0);
    cube5.castShadow = true;
    const cube6 = new Mesh(cubeGeometry, cubeMaterial);
    cube6.position.set(0, 0, 3);
    cube6.castShadow = true;
    const cube7 = new Mesh(cubeGeometry, cubeMaterial);
    cube7.position.set(-3, 0, 0);
    cube7.castShadow = true;
    const cube8 = new Mesh(cubeGeometry, cubeMaterial);
    cube8.position.set(0, 0, -3);
    cube8.castShadow = true;
    this.scene.add(cube1);
    this.scene.add(cube2);
    this.scene.add(cube3);
    this.scene.add(cube4);
    this.scene.add(cube5);
    this.scene.add(cube6);
    this.scene.add(cube7);
    this.scene.add(cube8);

    // Sphere with phong material
    const sphereGeometry = new SphereGeometry(1, 32, 32);
    const sphereMaterial = new MeshPhongMaterial({
      color: 0x00ff00,
      shininess: 80,
      specular: 0x222222
     });

     const phongSphere = new Mesh(sphereGeometry, sphereMaterial);
     phongSphere.position.set(20, 0, 0);
     phongSphere.castShadow = true;
     this.scene.add(phongSphere);
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
    // Rotate the cube
    if(this.cube) {
      this.cube.rotation.x += 0.02;
      this.cube.rotation.y += 0.02;
    }

    requestAnimationFrame(this.render);
    this.deltaTime = this.clock.getDelta();
    this.movementHandler.updateCameraMovement(this.camera, this.deltaTime);
    this.renderer.render(this.scene, this.camera);
  }
}

export default BasicScene;
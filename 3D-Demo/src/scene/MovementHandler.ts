import { Euler, PerspectiveCamera, Vector3 } from "three";

export class MovementHandler {
  private readonly cameraSpeed = 5.0;
  public moveForward = false;
  public moveBackward = false;
  public moveLeft = false;
  public moveRight = false;
  public rotation = new Euler(0, 0, 0, "YXZ");

  constructor() {}

  public updateCameraMovement(camera:PerspectiveCamera, deltaTime:number) {
    const direction = new Vector3();
    const right = new Vector3();

    // Get the current direction vector and right vector from the camera
    camera.getWorldDirection(direction);
    camera.getWorldDirection(right).cross(camera.up);

    // Don't move up or down
    direction.y = 0;
    right.y = 0;

    // Normalize vectors
    direction.normalize();
    right.normalize();

    // Decide which direction to move in
    if (this.moveForward) {
      camera.position.addScaledVector(direction, this.cameraSpeed * deltaTime);
    }
    if (this.moveBackward) {
      camera.position.addScaledVector(direction, -this.cameraSpeed * deltaTime);
    }
    if (this.moveLeft) {
      camera.position.addScaledVector(right, -this.cameraSpeed * deltaTime);
    }
    if (this.moveRight) {
      camera.position.addScaledVector(right, this.cameraSpeed * deltaTime);
    }
  }

  public updateCameraRotation(camera:PerspectiveCamera, event:MouseEvent, deltaTime:number) {
    const sensitivity = 0.05 * deltaTime;
    this.rotation.y -= event.movementX * sensitivity; // Left/Right
    this.rotation.x -= event.movementY * sensitivity; // Up/Down
    this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x)); // Limit vertical movement
    camera.quaternion.setFromEuler(this.rotation);
  }
}
import { BufferGeometry, Mesh, Object3D, PerspectiveCamera, Raycaster, Vector3 } from "three";

export function objectSelection(objects:Object3D[], camera:PerspectiveCamera):Object3D | null {
  // Create a raycaster
  const raycaster = new Raycaster();

  // Set the origin as the camera's position
  const origin = camera.position.clone();

  // Get the camera's direction vector
  const direction = new Vector3();
  camera.getWorldDirection(direction);

  // Setup the raycaster
  raycaster.set(origin, direction);

  // Cast the ray and check for objects intersecting
  const intersects = raycaster.intersectObjects(objects, true);

  // Return the first intersected object or null if nothing intersected.
  return intersects.length > 0 ? intersects[0].object : null;
}

export function extendObject(object:Object3D, factor:number, direction:string) {
  object.traverse((child) => {
    if (child instanceof Mesh) {
      if(!child.geometry || !(child.geometry instanceof BufferGeometry)) {
        console.warn("Object has no geometry or is not a BufferGeometry");
        return;
      }

      const geometry = child.geometry;
      const positionAttribute = geometry.getAttribute("position");

      // Bounding box is used to calculate the center of the geometry
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      if(!boundingBox) return;

      // Store the current position of the object
      const currentPosition = child.position.clone(); 

      if(direction === "+X") {
        const centerX = (boundingBox.max.x + boundingBox.min.x) / 2;

        // Modify the X-coordinate of the vertices to scale them relative to the center
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);

          // Scale the vertex relative to the center and adjust the position so it doesn't move
          const newX = centerX + (x - centerX) * factor;
          positionAttribute.setX(i, newX);
        }
      } else if (direction === "-X") {
        const centerX = (boundingBox.max.x + boundingBox.min.x) / 2;

        // Modify the X-coordinate of the vertices to scale them relative to the center
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);

          // Scale the vertex relative to the center and adjust the position so it doesn't move
          const newX = centerX + (x - centerX) / factor;
          positionAttribute.setX(i, newX);
        }
      } else if (direction === "+Y") {
        const centerY = (boundingBox.max.y + boundingBox.min.y) / 2;

        // Modify the Y-coordinate of the vertices to scale them relative to the center
        for (let i = 0; i < positionAttribute.count; i++) {
          const y = positionAttribute.getY(i);

          // Scale the vertex relative to the center and adjust the position so it doesn't move
          const newY = centerY + (y - centerY) * factor;
          positionAttribute.setY(i, newY);
        }
      } else if (direction === "-Y") {
        const centerY = (boundingBox.max.y + boundingBox.min.y) / 2;

        // Modify the Y-coordinate of the vertices to scale them relative to the center
        for (let i = 0; i < positionAttribute.count; i++) {
          const y = positionAttribute.getY(i);

          // Scale the vertex relative to the center and adjust the position so it doesn't move
          const newY = centerY + (y - centerY) / factor;
          positionAttribute.setY(i, newY);
        }
      } else if (direction === "+Z") {
        const centerZ = (boundingBox.max.z + boundingBox.min.z) / 2;

        // Modify the Y-coordinate of the vertices to scale them relative to the center
        for (let i = 0; i < positionAttribute.count; i++) {
          const z = positionAttribute.getZ(i);

          // Scale the vertex relative to the center and adjust the position so it doesn't move
          const newZ = centerZ + (z - centerZ) * factor;
          positionAttribute.setZ(i, newZ);
        }
      } else if (direction === "-Z") {
        const centerZ = (boundingBox.max.z + boundingBox.min.z) / 2;

        // Modify the Y-coordinate of the vertices to scale them relative to the center
        for (let i = 0; i < positionAttribute.count; i++) {
          const z = positionAttribute.getZ(i);

          // Scale the vertex relative to the center and adjust the position so it doesn't move
          const newZ = centerZ + (z - centerZ) / factor;
          positionAttribute.setZ(i, newZ);
        }
      }

      // Apply the scaling of the geometry and keep the position intact
      child.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

      // Update geometry
      positionAttribute.needsUpdate = true;

      // Update the geometry's bounding box and sphere
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
    }
  })
}

// Function for moving an object in the desired direction
export function moveObject(object:Object3D, amount:number, direction:string) {
  if(direction === "+X") {
    object.position.set(object.position.x + amount, object.position.y, object.position.z);
  } else if (direction === "-X") {
    object.position.set(object.position.x - amount, object.position.y, object.position.z);
  } else if (direction === "+Y") {
    object.position.set(object.position.x, object.position.y + amount, object.position.z);
  } else if (direction === "-Y") {
    object.position.set(object.position.x, object.position.y - amount, object.position.z);
  } else if (direction === "+Z") {
    object.position.set(object.position.x, object.position.y, object.position.z + amount);
  } else if (direction === "-Z") {
    object.position.set(object.position.x, object.position.y, object.position.z - amount);
  }
}
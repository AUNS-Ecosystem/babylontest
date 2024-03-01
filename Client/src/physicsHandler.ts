// PhysicsHandler.ts
import { Mesh, Scene, Vector3, PhysicsImpostor, ArcRotateCamera } from "@babylonjs/core";

export class PhysicsHandler {
    private mesh: Mesh;
    private scene: Scene;

    constructor(mesh: Mesh, scene: Scene) {
        this.mesh = mesh;
        this.scene = scene;
    }

    public move(inputVector: Vector3, camera: ArcRotateCamera) {
        if (!camera) {
            console.warn("Camera not set for PhysicsHandler.");
            return;
        }
    
        // Get the forward direction from the camera
        const forward = camera.getForwardRay().direction.normalize();
        
        // Calculate the right vector based on the camera's rotation
        const right = Vector3.Cross(Vector3.Up(), forward).normalize();
    
        // Adjust inputVector.z and inputVector.x to match your input system if necessary
        // Assuming inputVector.z is forward/backward and inputVector.x is left/right
    
        // Calculate the desired movement direction based on the camera's orientation
        let movementDirection = Vector3.Zero();
        movementDirection = movementDirection.add(forward.scale(inputVector.z));
        movementDirection = movementDirection.add(right.scale(inputVector.x));
        movementDirection.y = 0; // Ensure movement is horizontal
    
        // Apply the calculated movement direction
        // Normalize the movement vector to ensure consistent movement speed in all directions
        const normalizedMovement = movementDirection.normalize().scale(5); // Adjust the scale factor as needed for speed
        this.mesh.physicsImpostor.setLinearVelocity(normalizedMovement);
    }
}    
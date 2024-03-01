// player.ts
import { ArcRotateCamera, Scene, MeshBuilder, Vector3, PhysicsImpostor, Mesh, Color3, StandardMaterial } from "@babylonjs/core";
import { InputControls } from "./inputControls";
import { createCamera } from "./cameraSetup"; // Adjust the path as necessary
import { PhysicsHandler } from "./physicsHandler"; // Make sure the path is correct

export class Player {
    private scene: Scene;
    private inputControls: InputControls;
    private mesh: Mesh;
    private physicsHandler: PhysicsHandler;
    public camera: ArcRotateCamera; // Made public if you need to access it outside

    constructor(scene: Scene, canvas: HTMLCanvasElement) {
        this.scene = scene;
        // Assume createPlayerMesh() is a method that creates and returns a Mesh for the player
        this.mesh = this.createPlayerMesh(); // This should create the player mesh
        this.camera = createCamera(scene, canvas, this.mesh); // Now correctly passing the mesh to createCamera
        this.inputControls = new InputControls(scene);
        this.physicsHandler = new PhysicsHandler(this.mesh, this.scene);
        this.initializeInputControls();
    }


    private createPlayerMesh(): Mesh {
        // Implementation of player mesh creation...
        const sphere = MeshBuilder.CreateSphere("player", {diameter: 2}, this.scene);
        sphere.position = new Vector3(0, 1, 0);
        const material = new StandardMaterial("playerMaterial", this.scene);
        material.diffuseColor = new Color3(1, 0, 0); // Example: Red
        sphere.material = material;
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
        return sphere;
    }

    private initializeInputControls() {
        // Initialize input controls for the player
        this.inputControls = new InputControls(this.scene);
       

        // Use input controls to move the sphere
        this.scene.onBeforeRenderObservable.add(() => {
            const inputVector = this.inputControls.getInputVector();
            this.mesh.physicsImpostor.setLinearVelocity(inputVector.scale(5));
        });
    }

    
    public getMesh(): Mesh {
        return this.mesh; // Expose the player's mesh for external access
    }

   
    public move(inputVector: Vector3) {
        // Here, we directly use the input vector to calculate the force direction
        // based on the camera's forward direction.
        if (!this.camera) {
            console.warn("Camera not set for Player instance.");
            return;
        }
        const forceDirection = this.camera.getForwardRay().direction;
        forceDirection.scaleInPlace(inputVector.length()); // Scale by input magnitude
        this.mesh.physicsImpostor.applyForce(forceDirection, this.mesh.getAbsolutePosition());
    }

    public update() {
        const inputVector = this.inputControls.getInputVector();
    
        // Get the camera's forward vector, but ignore its pitch to keep movement horizontal
        let forward = this.camera.getForwardRay().direction;
        forward.y = 0; // Set the vertical component to 0 to ignore camera's pitch
        forward.normalize(); // Normalize the vector after altering it
    
        let right = Vector3.Cross(Vector3.Up(), forward).normalize();
    
        // Combine the adjusted forward and right directions with the input vector
        const moveDirection = forward.scale(inputVector.z).add(right.scale(inputVector.x));
    
        // Apply the calculated move direction to the player's physics impostor
        this.mesh.physicsImpostor.setLinearVelocity(moveDirection.scale(5)); // Adjust speed as necessary
    }
    

}

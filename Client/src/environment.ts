// Add these imports at the top of your environment.ts file
import { PhysicsImpostor, StandardMaterial, Color3, Scene, MeshBuilder, Vector3, HemisphericLight, Mesh } from "@babylonjs/core";

export class Environment {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.createGround();
    this.createWalls();
    this.createLight();
  }

  private createGround() {
    const ground = MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, this.scene);
    const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
    ground.material = groundMaterial;
    // Add a physics impostor to the ground
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);
  }

  private createWalls() {
    const wallThickness = 0.5;
    const wallHeight = 2.5;
    const walls = [
      MeshBuilder.CreateBox("wall1", { width: 50 + wallThickness * 2, height: wallHeight, depth: wallThickness }, this.scene),
      MeshBuilder.CreateBox("wall2", { width: 50 + wallThickness * 2, height: wallHeight, depth: wallThickness }, this.scene),
      MeshBuilder.CreateBox("wall3", { width: wallThickness, height: wallHeight, depth: 50 }, this.scene),
      MeshBuilder.CreateBox("wall4", { width: wallThickness, height: wallHeight, depth: 50 }, this.scene),
    ];
    walls[0].position.z = -25 - wallThickness / 2;
    walls[1].position.z = 25 + wallThickness / 2;
    walls[2].position.x = -25 - wallThickness / 2;
    walls[3].position.x = 25 + wallThickness / 2;

    const wallMaterial = new StandardMaterial("wallMaterial", this.scene);
    wallMaterial.diffuseColor = new Color3(1, 1, 1);
    walls.forEach(wall => {
      wall.material = wallMaterial;
      // Add physics impostors to each wall
      wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);
    });
  }

  private createLight() {
    new HemisphericLight("light1", new Vector3(1, 1, 0), this.scene);
  }
}

declare var Ammo: any; // Inform TypeScript about the Ammo global variable

import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
    Engine,
    Scene,
    Vector3,
} from "@babylonjs/core";
import { AmmoJSPlugin } from "@babylonjs/core/Physics/Plugins/ammoJSPlugin";
import { Environment } from "./environment";
import { Player } from "./player"; // Ensure Player class is correctly imported

class App {
    private scene: Scene;
    private engine: Engine;
    
    constructor() {
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        this.engine = new Engine(canvas, true);
        this.scene = new Scene(this.engine);

        // Async initialization to ensure physics is enabled before creating any physics impostors
        (async () => {
            await this.initPhysics(this.scene);

            // Now that physics is enabled, it's safe to create the player
            // Assuming `camera` is the ArcRotateCamera instance you've created
            const playerInstance = new Player(this.scene, canvas);

            // Environment setup can also proceed
            new Environment(this.scene);

            // Start the render loop after everything is set up
            this.engine.runRenderLoop(() => {
                playerInstance.update(); // Ensure player is updated each frame
                this.scene.render();
            });
        })();
    }

    async initPhysics(scene: Scene) {
        await Ammo();
        const gravityVector = new Vector3(0, -9.81, 0);
        const physicsPlugin = new AmmoJSPlugin(true, Ammo);
        scene.enablePhysics(gravityVector, physicsPlugin);
        
    }

    
}

new App();
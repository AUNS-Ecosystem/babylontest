// cameraSetup.ts
import { ArcRotateCamera, Scene, Vector3, Mesh, Tools } from "@babylonjs/core";
import { ArcRotateCameraPointersInput } from "@babylonjs/core/Cameras/Inputs/index";

export function createCamera(scene: Scene, canvas: HTMLCanvasElement, playerMesh: Mesh): ArcRotateCamera {
    const camera = new ArcRotateCamera(
        "camera0",
        -Math.PI / 2 - 0.2, // Alpha - Horizontal rotation
        Tools.ToRadians(60), // Beta - Vertical angle, adjust for better height
        10, // Radius - Distance from the player, adjust for better view
        playerMesh.position.add(new Vector3(1, 3, 1)), // Adjust Y for height above player
        scene
    );

    camera.attachControl(canvas, true);

    // Remove default camera controls that may interfere
    camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");
    camera.inputs.removeByType("ArcRotateCameraMouseWheelInput");

    // Set camera limits and sensitivities
    const pointersInput = camera.inputs.attached.pointers as ArcRotateCameraPointersInput;
    if (pointersInput) {
        pointersInput.angularSensibilityX = 1500;
        pointersInput.angularSensibilityY = 1500;
    }

    // Lock the camera's target to the player mesh
    camera.lockedTarget = playerMesh;

    // Enable pointer lock on canvas click for immersive experience
    scene.onPointerDown = () => {
        scene.getEngine().enterPointerlock();
    };

    return camera;
}

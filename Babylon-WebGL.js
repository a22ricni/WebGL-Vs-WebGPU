import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    //scene.createDefaultCameraOrLight(true, false, true);
    scene.createDefaultLight();

    const camera = new BABYLON.UniversalCamera(
        "uCamera",
        new BABYLON.Vector3(0, 1, -5),
        scene
    );

    const box = BABYLON.MeshBuilder.CreateBox(
        "myBox",
        {
            size: 0.1,
        }
    )

    const ground = BABYLON.MeshBuilder.CreateGround(
        "myGround",
        {
            width: 3,
            height: 3,
            subdivisionsX: 10,
            subdivisionsY: 20,
        }
    );

    scene.registerBeforeRender(function() {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    });

    ground.material = new BABYLON.StandardMaterial();
    ground.material.wireframe = true;

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
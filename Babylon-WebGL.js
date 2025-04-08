import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    let amount = 1

    //scene.createDefaultCameraOrLight(true, false, true);
    scene.createDefaultLight();

    const camera = new BABYLON.UniversalCamera(
        "uCamera",
        new BABYLON.Vector3(0, 1, -5),
        scene
    );

    const box = BABYLON.MeshBuilder.CreateBox("myBox", {
        size: 0.1,
    });

    let matricesData = new Float32Array(16 * amount);

    for (var i = 0; i < amount; i++) {
        var matrix = BABYLON.Matrix.Translation(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
        matrix.copyToArray(matricesData, i * 16);
           
    }

    box.thinInstanceSetBuffer("matrix", matricesData, 16);

    const ground = BABYLON.MeshBuilder.CreateGround("myGround", {
        width: 3,
        height: 3,
        subdivisionsX: 10,
        subdivisionsY: 20,
    });

    scene.registerBeforeRender(function () {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    });

    ground.material = new BABYLON.StandardMaterial();
    ground.material.wireframe = true;

    //box.thinInstanceSetBuffer(BABYLON.Matrix.Translation(Math.random() * 2 - 1, 2, 0), amount, 16)

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();

function createScene () {
    const scene = new BABYLON.Scene(engine);
    let amount = 6

    scene.createDefaultLight();

    const camera = new BABYLON.UniversalCamera(
        "uCamera",
        new BABYLON.Vector3(0, 1, -50),
        scene
    );

    const box = BABYLON.MeshBuilder.CreateBox("myBox", {
        size: 0.1,
    });

    let matricesData = new Float32Array(16 * amount);

    for (var i = 0; i < amount; i++) {
        var matrix = BABYLON.Matrix.Translation(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10)
        matrix.copyToArray(matricesData, i * 16);
           
    }

    box.thinInstanceSetBuffer("matrix", matricesData, 16);

    scene.registerBeforeRender(function () {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

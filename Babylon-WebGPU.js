import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
let frames = 0;
let prevTime = performance.now();
let FPS = "";
let amountOfFPS = 0;
let stopGetMoreData = true;
let FPSTracker = false

function createScene() {
    const scene = new BABYLON.Scene(engine);
    let amount = 100000;

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
        var matrix = BABYLON.Matrix.Translation(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        matrix.copyToArray(matricesData, i * 16);
    }

    box.thinInstanceSetBuffer("matrix", matricesData, 16);

    window.dispatchEvent(new CustomEvent("allCubesIsLoaded"));

    scene.registerBeforeRender(function () {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    });

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    if (FPSTracker == true) {
        frames++;
        const time = performance.now();

        if (time >= prevTime + 1000) {
            FPS += Math.round((frames * 1000) / (time - prevTime)) + "\n";
            frames = 0;
            prevTime = time;
            amountOfFPS++;
        }
        if (amountOfFPS == 5 && stopGetMoreData == true) {
            stopGetMoreData = false;
            let anchor = document.createElement("a");
            let fileName = `Babylon_WebGPU_Data.csv`;
            anchor.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," + encodeURI(FPS)
            );
            anchor.setAttribute("download", fileName);
            document.body.appendChild(anchor);
            anchor.click();
        }
    }
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

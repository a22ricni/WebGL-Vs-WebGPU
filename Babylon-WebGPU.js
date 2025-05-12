import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
let amountOfCubes = 1000;
let frames = 0;
let FPS = "";
let FPSTracker = true;
let prevTime = performance.now();
let counter = 0;

function createScene() {
    const scene = new BABYLON.Scene(engine);

    scene.createDefaultLight();

    const camera = new BABYLON.UniversalCamera(
        "uCamera",
        new BABYLON.Vector3(0, 0, -35),
        scene
    );

    let array = [];
    for (var i = 0; i < amountOfCubes; i++) {
        array.push(
            BABYLON.MeshBuilder.CreateSphere("sphere", {
                segments: 5,
                diameter: 0.3
            })
        );
        array[i].position = new BABYLON.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
    }

    window.dispatchEvent(new CustomEvent("allCubesIsLoaded"));

    scene.registerBeforeRender(function () {
        for (var i = 0; i < amountOfCubes; i++) {
            array[i].rotation.x += 0.01;
            array[i].rotation.y += 0.01;
        }
    });

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    if (FPSTracker == true) {
        frames++;
        const startTime = performance.now();

        if (startTime >= prevTime + 1000) {
            FPS += Math.round((frames * 1000) / (startTime - prevTime)) + "\n";
            frames = 0;
            prevTime = startTime;
            counter++;
        }
        if (counter == 120) {
            FPSTracker = false;
            alert("DONE!");
            let anchor = document.createElement("a");
            let fileName = `Babylon_WebGPU_FPS.csv`;
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

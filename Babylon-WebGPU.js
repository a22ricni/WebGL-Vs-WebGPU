import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.WebGPUEngine(canvas);
await engine.initAsync();
let amountOfCubes = 10000;
let frames = 0;
let prevTime = performance.now();
let FPS = "";
let amountOfFPS = 0;
let stopGetMoreData = true;
let FPSTracker = false;

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
            BABYLON.MeshBuilder.CreateBox("myBox", {
                size: 0.1,
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

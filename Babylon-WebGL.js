import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);
let amountOfCubes = 1000;
let FPS = "";
let FPSTracker = false;
let counter = 0;
const times = [];

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
        window.requestAnimationFrame(() => {
            const startTime = performance.now();
            while (times.length > 0 && times[0] <= startTime - 1000) {
                times.shift();
            }
            times.push(startTime);
            FPS += times.length + "\n";
            counter++;
            if (counter >= 500) {
                FPSTracker = false;
                alert("DONE");
                let anchor = document.createElement("a");
                let fileName = `Babylon_WebGL_FPS.csv`;
                anchor.setAttribute(
                    "href",
                    "data:text/plain;charset=utf-8," + encodeURI(FPS)
                );
                anchor.setAttribute("download", fileName);
                document.body.appendChild(anchor);
                anchor.click();
            }
        });
    }
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

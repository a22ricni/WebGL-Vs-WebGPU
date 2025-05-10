import * as THREE from "three";

const amountOfCubes = 1000;
let FPS = "";
let FPSTracker = false;
const times = [];
let counter = 0;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.set(0, 0, 600);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

let array = [];
for (let i = 0; i < amountOfCubes; i++) {
    array.push(new THREE.Mesh(geometry, material));
    array[i].position.set(
        Math.random() * 500 - 250,
        Math.random() * 500 - 250,
        Math.random() * 500 - 250
    );
    scene.add(array[i]);
}

window.dispatchEvent(new CustomEvent("allCubesIsLoaded"));

function animate() {
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
                let fileName = `Three_WebGL_FPS.csv`;
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

    for (let i = 0; i < amountOfCubes; i++) {
        array[i].rotation.x += 0.01;
        array[i].rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

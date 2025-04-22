import * as THREE from "three/webgpu";

const amountOfCubes = 300000;
var matrix = new THREE.Matrix4();
var position = new THREE.Vector3();
let frames = 0;
let prevTime = performance.now();
let FPS = "";
let amountOfFPS = 0;
let stopGetMoreData = true;
const renderer = new THREE.WebGPURenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.set(0, 0, 1200);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.InstancedMesh(geometry, material, amountOfCubes);
scene.add(cube);

for (let i = 0; i < amountOfCubes; i++) {
    position.set(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
    );

    matrix.setPosition(position);
    cube.setMatrixAt(i, matrix);
}

window.dispatchEvent(new CustomEvent("allCubesIsLoaded"));

function animate() {
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
            let fileName = `Three_WebGPU_data.csv`;
            anchor.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," + encodeURI(FPS)
            );
            anchor.setAttribute("download", fileName);
            document.body.appendChild(anchor);
            anchor.click();
        }
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

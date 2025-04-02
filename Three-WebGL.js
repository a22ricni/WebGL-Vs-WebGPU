import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 10);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const gridHelper = new THREE.GridHelper(15, 50);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
let boxArray = [];

for (let i = 0; i < 2; i++) {
    boxArray.push(new THREE.Mesh(geometry, material));
    boxArray[i].position.set(Math.random() * -10 + 5, 0, 0);
    scene.add(boxArray[i]);
}

function animate(time) {
    for (let i = 0; i < boxArray.length; i++) {
        boxArray[i].rotation.x = time / 1000;
        boxArray[i].rotation.y = time / 1000;
        renderer.render(scene, camera);
    }
}

renderer.setAnimationLoop(animate);

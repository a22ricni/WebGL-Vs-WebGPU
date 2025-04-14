import * as THREE from "three";

const amountOfCubes = 100000;
var matrix = new THREE.Matrix4();
var position = new THREE.Vector3();
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

camera.position.set(0, 0, 1200);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const mesh = new THREE.InstancedMesh(geometry, material, amountOfCubes);
scene.add(mesh);

for (let i = 0; i < amountOfCubes; i++) {
    position.set(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
    );

    matrix.setPosition(position);
    mesh.setMatrixAt(i, matrix);
}

let factor = 1.01;
let distance = new THREE.Vector3(0, 0, 0);
function animate() {
/*     for (let i = 0; i < amountOfCubes; i++) {
        mesh.getMatrixAt(i, matrix);

        position.setFromMatrixPosition(matrix);

        if (position.distanceTo(distance) >= 500) {
            factor = 0.99;
        }
        if (position.distanceTo(distance) <= 1) {
            factor = 1.01;
        }
        position.x *= factor;
        position.y *= factor;
        position.z *= factor;
        matrix.setPosition(position);

        mesh.setMatrixAt(i, matrix);
    } */

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
/*     mesh.instanceMatrix.needsUpdate = true; */
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

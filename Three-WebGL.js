import { Vector3 } from "babylonjs";
import * as THREE from "three";

const amountOfCubes = 100;
var matrix = new THREE.Matrix4()
var position = new THREE.Vector3()
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

camera.position.set(0, 0, 500);
/* camera.position.set(0, 0, 1450); */

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const mesh = new THREE.InstancedMesh(geometry, material, amountOfCubes);
scene.add(mesh);

let meshPosition = new THREE.Object3D();
for (let i = 0; i < amountOfCubes; i++) {
    /*     meshPosition.position.x = Math.random() * 1000 - 500;
    meshPosition.position.y = Math.random() * 1000 - 500;
    meshPosition.position.z = Math.random() * 1500 - 750; */
    meshPosition.position.set(
        Math.random() * 300 - 150,
        Math.random() * 300 - 150,
        Math.random() * 300 - 150
    );

    meshPosition.updateMatrix();
    mesh.setMatrixAt(i, meshPosition.matrix);
}

function animate(time) {
    /*         meshPosition.position.x = 10
        meshPosition.position.y = 10
        meshPosition.position.z = 10 */
    for (let i = 0; i < amountOfCubes; i++) {
        mesh.getMatrixAt(i, matrix)

        position.setFromMatrixPosition(matrix)
        position.x *= 1.001
        position.y *= 1.001
        matrix.setPosition(position)

        mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

import * as THREE from "three";

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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 1450);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const gridHelper = new THREE.GridHelper(15, 50);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const mesh = new THREE.InstancedMesh(geometry, material, 10000);
scene.add(mesh);

const meshPosition = new THREE.Object3D();
for (let i = 0; i < 10000; i++) {
    meshPosition.position.x = Math.random() * 1000 - 500;
    meshPosition.position.y = Math.random() * 1000 - 500;
    meshPosition.position.z = Math.random() * 1500 - 750;

    meshPosition.updateMatrix();
    mesh.setMatrixAt(i, meshPosition.matrix);
}


function animate(time) {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

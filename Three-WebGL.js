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

camera.position.set(0, 2, 1000);

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(light);

const gridHelper = new THREE.GridHelper(15, 50);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const mesh = new THREE.InstancedMesh(geometry, material, 1000);
scene.add(mesh);

const meshPosition = new THREE.Object3D();
for (let i = 0; i < 1000; i++) {
    meshPosition.position.x = Math.random() * 2000 - 1000;
    meshPosition.position.y = 1;
    meshPosition.position.z = 1;

    meshPosition.updateMatrix();
    mesh.setMatrixAt(i, meshPosition.matrix);
}


function animate(time) {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

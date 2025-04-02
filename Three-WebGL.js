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

camera.position.set(0, 2, 5);

const light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 4);
scene.add(light);

const gridHelper = new THREE.GridHelper(15, 50);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({color: 0x00FF00});
const box = new THREE.Mesh(geometry, material);

scene.add(box);

function animate(time){
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

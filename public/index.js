import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { FBXLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/FBXLoader.js"

const PI = 3.14159

let model

// Create Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282c34);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('threejs').appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-9, 4, 14);
camera.rotation.set(-0.06 * PI, 0, -0.015 * PI);

// const loader = new ColladaLoader();
// loader.load("Models/shep.dae", (collada) => {
//     model = collada.scene;
//     model.updateMatrix();
//     scene.add(model);
// }, undefined, (e) => {
//     console.error(e);
// });

const loader = new FBXLoader();
loader.load("shep.fbx", 
    (obj) => {
        obj.scale.set(0.01, 0.01, 0.01);
        obj.rotation.set(0.01 * PI, -0.315 * PI, 0.02 * PI);
        scene.add(obj)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
);

const frontSpot = new THREE.SpotLight(0xeeeece);
const frontSpot2 = new THREE.SpotLight(0xddddce);

frontSpot.position.set(1000, 1000, 1000);
frontSpot2.position.set(-500, -500, -500);

scene.add(frontSpot);
scene.add(frontSpot2);

const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { FBXLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/FBXLoader.js"

let model

// Create Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282c34);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
var size = get_size()
renderer.setSize(size);
renderer.setPixelRatio(window.devicePixelRatio);
const renderDom = renderer.domElement
renderDom.width = size
renderDom.height = size

const three = document.getElementById('threejs')
three.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    size = get_size()
    renderer.setSize(size);
    renderDom.width = size
    renderDom.height = size
}, false);

function get_size() {
    var minLength = Math.min(window.innerWidth, window.innerHeight)
    console.log(minLength)
    return minLength * 0.8
}

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(-9, 2, 14);
camera.rotation.set(-0.01 * Math.PI, 0, -0.015 * Math.PI);

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
        obj.rotation.set(0.01 * Math.PI, -0.315 * Math.PI, 0.02 * Math.PI);
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
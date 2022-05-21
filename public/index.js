import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js"

let t = 0

// Create Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282c34);

const renderer = new THREE.WebGLRenderer({antialias: true});
let size = get_size();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(size * 1.5, size);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.id = "WebGl";

const three = document.getElementById('threejs')
three.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    size = get_size();
    renderer.setSize(size * 1.5, size);
    renderer.setPixelRatio(window.devicePixelRatio);
}, false);

function get_size() {
    var minLength = Math.min(window.innerWidth / 1.5, window.innerHeight);
    return minLength * 0.8;
}

const camera = new THREE.PerspectiveCamera(50, 1.5, 0.1, 1000);
camera.position.set(-2, 4, 15);
camera.rotation.set(-0.08 * Math.PI, 0, 0);

const material = new THREE.MeshToonMaterial()
material.gradientMap = null;

const loader = new GLTFLoader();
loader.load("shep.glb", (gltf) => {
    const shepMesh = gltf.scene.children()[0];
    shepMesh.material = material
}, undefined, (e) => {
    console.error(e);
});
// loader.load("Models/shep.dae", (collada) => {
//     model = collada.scene;
//     model.updateMatrix();
//     scene.add(model);
// }, undefined, (e) => {
//     console.error(e);
// });

// const loader = new FBXLoader();

// loader.load("shep.fbx", 
//     (obj) => {
//         model=obj;
//         model.scale.set(0.01, 0.01, 0.01);
//         model.rotation.set(0.01 * Math.PI, -0.315 * Math.PI, 0.02 * Math.PI);
//         model.material = material
//         scene.add(model)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// );

const frontSpot = new THREE.SpotLight(0xeeeece);
const frontSpot2 = new THREE.SpotLight(0xddddce);

frontSpot.position.set(1000, 1000, 1000);
frontSpot2.position.set(-500, -500, -500);

scene.add(frontSpot);
scene.add(frontSpot2);

const animate = function () {
    requestAnimationFrame(animate);
    
    // if (model) {
    //     model.rotation.set((0.01 + (t * 0.001)) * Math.PI, -0.315 * Math.PI, (0.02 + (t * 0.001)) * Math.PI);
    // }
    
    t++;
    renderer.render(scene, camera);
};

animate();
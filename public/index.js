import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js"

let t = 0;
let shepParts = [];

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});

let size = get_size();
renderer.setClearColor(0x000000, 0);
renderer.setSize(size * 1.25, size);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.id = "WebGl";

const three = document.getElementById('threejs');
three.appendChild(renderer.domElement);

const dialogue = document.querySelector("#dialogue");
dialogue.style.right = size + "px";

window.addEventListener('resize', () => {
    size = get_size();
    renderer.setSize(size * 1.25, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    dialogue.style.right = size + "px";
}, false);

function get_size() {
    var minLength = Math.min(window.innerWidth / 1.25, window.innerHeight);
    return minLength * 0.6;
}

const camera = new THREE.PerspectiveCamera(36, 1.25, 0.1, 1000);
camera.position.set(-0.25,0,-21);
camera.rotation.set(0, Math.PI, 0);

const material1 = new THREE.MeshToonMaterial()
material1.color = new THREE.Color(0x959490);

const material2 = new THREE.MeshToonMaterial()
material2.color = new THREE.Color(0x353535);

const loader = new GLTFLoader();
loader.load("shep.glb", (gltf) => {
    const shep = gltf.scene.children[0];

    const child0 = shep.children[0];
    child0.material = material1;
    scene.add(child0);
    
    const child1 = shep.children[0];
    child1.material = material2;
    scene.add(child1);

    shepParts.push(child0, child1);

}, undefined, (e) => {
    console.error(e);
});

const frontSpot = new THREE.SpotLight(0xeeeece);
const frontSpot2 = new THREE.SpotLight(0xddddce);

frontSpot.position.set(1000, 1000, 1000);
frontSpot2.position.set(-500, -500, -500);

scene.add(frontSpot);
scene.add(frontSpot2);

const animate = function () {
    requestAnimationFrame(animate);

    shepParts.forEach((e) => {
        e.rotation.set(0, t / 100, t / 200)
    });
    
    t++;
    renderer.render(scene, camera);
};

animate();
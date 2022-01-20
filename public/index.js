import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { FBXLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/FBXLoader.js"

// Create Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282c34);

// Define a camera, set it to fill the browser window and position it
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 20.2469;
camera.position.y = -8.64454;
camera.position.z = 6.37;

camera.rotation.x = 72.4;
camera.rotation.y = 0;
camera.rotation.z = 90;

// Define a renderer, and set it to fill the browser window
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Get an element from the DOM and append renderer.domElement to it
document.getElementById('threejs').appendChild(renderer.domElement);

// Define (or import) your object's geometry
// const geometry = new THREE.BoxGeometry( 20, 20, 20 );



// Define your object's material
// const material = new THREE.MeshStandardMaterial({
//   color: 0xfcc742,
//   emissive: 0x111111,
//   metalness: 0,
//   roughness: 1,
// });

// Create the mesh, scale it and add it to the scene
// const mesh = new THREE.Mesh(geometry, material);

// mesh.scale.x = 0.1;
// mesh.scale.y = 0.1;
// mesh.scale.z = 0.1;

const mesh = new THREE.Mesh()
const loader = new FBXLoader();
loader.load("shep.fbx", 
    (obj) => {
        obj.rotation.x = 94.3;
        obj.rotation.y = 0;
        obj.rotation.z = 181;

        obj.scale.x = 0.01;
        obj.scale.y = 0.01;
        obj.scale.z = 0.01;

        scene.add(obj)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
);

// Create lights, position them, and add them to the scene
const frontSpot = new THREE.SpotLight(0xeeeece);
const frontSpot2 = new THREE.SpotLight(0xddddce);

frontSpot.position.set(1000, 1000, 1000);
frontSpot2.position.set(-500, -500, -500);

scene.add(frontSpot);
scene.add(frontSpot2);

// Create an animate function, which will allow you to render your scene and define any movements
const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

// Call the animate function
animate();
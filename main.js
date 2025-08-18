import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  createProton,
  createNeutron,
  resetNucleus,
  protons,
  neutrons,
} from "./src/nucleus.js";
import {
  createElectrosphere,
  createElectron,
  electrosphereLayers,
  resetElectrosphere,
} from "./src/electrosphere.js";
import { createLights } from "./src/lights.js";
import { vibrateParticle } from "./src/utils.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

createLights(scene);

document
  .getElementById("proton")
  .addEventListener("click", () => createProton(scene));
document
  .getElementById("neutron")
  .addEventListener("click", () => createNeutron(scene));
document
  .getElementById("electrosphere")
  .addEventListener("click", () => createElectrosphere(scene));
document
  .getElementById("electron")
  .addEventListener("click", () => createElectron(scene));
document
  .getElementById("resetElectrosphere")
  .addEventListener("click", () => resetElectrosphere(scene));
document
  .getElementById("resetNucleus")
  .addEventListener("click", () => resetNucleus(scene));

function animate() {
  protons.forEach((p) => vibrateParticle(p, 0.002));
  neutrons.forEach((n) => vibrateParticle(n, 0.002));

  electrosphereLayers.forEach((layer) => {
    layer.orbit.rotation.z += 0.01;
    layer.electrons.forEach((e) => {
      e.position.x = layer.radius * Math.cos(0.2 + e.phase);
      e.position.y = layer.radius * Math.sin(0.2 + e.phase);
    });
  });

  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

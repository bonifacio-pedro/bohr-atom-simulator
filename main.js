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

export const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

createLights();

document
  .getElementById("proton")
  .addEventListener("click", () => createProton());
document
  .getElementById("neutron")
  .addEventListener("click", () => createNeutron());
document
  .getElementById("electrosphere")
  .addEventListener("click", () => createElectrosphere());
document
  .getElementById("electron")
  .addEventListener("click", () => createElectron());
document
  .getElementById("resetElectrosphere")
  .addEventListener("click", () => resetElectrosphere());
document
  .getElementById("resetNucleus")
  .addEventListener("click", () => resetNucleus());

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

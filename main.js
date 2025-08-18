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
import { firstVisit } from "./src/firstScreen.js";
import { createStars } from "./src/stars.js";
import { getActualLayerSpeed } from "./src/bohrElectronSpeed.js";

window.addEventListener("load", () => {
  document.getElementById("loading-overlay").remove();
});

if (!localStorage.getItem("hasVisited")) {
  document.getElementById("welcome-overlay").style.display = "flex";
} else {
  document.getElementById("welcome-overlay").style.display = "none";
}

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
  .getElementById("start-btn")
  .addEventListener("click", () => firstVisit());
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

createStars(1500);

function animate() {
  protons.forEach((p) => vibrateParticle(p, 0.002));
  neutrons.forEach((n) => vibrateParticle(n, 0.002));

  electrosphereLayers.forEach((layer, i) => {
    const layerSpeed = getActualLayerSpeed(i + 1);

    layer.orbit.rotation.z += layerSpeed;

    layer.electrons.forEach((e) => {
      let angle = layer.orbit.rotation.z + e.phase;

      e.position.x = layer.radius * Math.cos(angle);
      e.position.y = layer.radius * Math.sin(angle);
      e.position.z = 0;
    });
  });
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

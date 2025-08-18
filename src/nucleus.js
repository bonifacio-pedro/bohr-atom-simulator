import * as THREE from "three";
import { randomInRange, updateCounts } from "./utils.js";
import { resetElectrosphere, electrosphereLayers } from "./electrosphere.js";
import { updateElementInfo } from "./element.js";
import { scene } from "../main.js";
export var protons = [];
export var neutrons = [];

function refreshElementState() {
  const protonCount = protons.length;
  const neutronCount = neutrons.length;
  const electronCount = electrosphereLayers.reduce(
    (acc, layer) => acc + layer.electrons.length,
    0
  );
  updateElementInfo(protonCount, electronCount, neutronCount);
}

export function createProton() {
  const geometry = new THREE.SphereGeometry(0.15, 32, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff3939,
    metalness: 0.7,
    roughness: 0.2,
  });
  const proton = new THREE.Mesh(geometry, material);

  proton.position.x = randomInRange(-0.1, 0.1);
  proton.position.y = randomInRange(-0.1, 0.1);
  proton.position.z = randomInRange(-0.1, 0.1);

  protons.push(proton);
  scene.add(proton);

  updateCounts();
  refreshElementState();
}

export function createNeutron() {
  const geometry = new THREE.SphereGeometry(0.15, 32, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0xb6d7a8,
    metalness: 0.7,
    roughness: 0.2,
  });
  const neutron = new THREE.Mesh(geometry, material);

  neutron.position.x = randomInRange(-0.1, 0.1);
  neutron.position.y = randomInRange(-0.1, 0.1);
  neutron.position.z = randomInRange(-0.1, 0.1);

  neutrons.push(neutron);
  scene.add(neutron);

  updateCounts();
  refreshElementState();
}

export function resetNucleus() {
  const confirmed = confirm(
    "Are you sure you want to reset the core? This will eliminate the electrosphere along with it."
  );

  if (!confirmed) return;

  protons.forEach((proton) => {
    scene.remove(proton);
  });

  neutrons.forEach((neutron) => {
    scene.remove(neutron);
  });

  protons.length = 0;
  neutrons.length = 0;

  document.getElementById("neutron-count").textContent = neutrons.length;

  resetElectrosphere();
  refreshElementState();
}

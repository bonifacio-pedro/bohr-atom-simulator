import * as THREE from "three";
import { updateCounts } from "./utils.js";
import { neutrons, protons } from "./nucleus.js";
import { orbitalSequence } from "./orbitalSequence.js";
import { updateElementInfo } from "./element.js";
import { scene } from "../main.js";
import { getLayerRadius, getReprCurrentRadius } from "./bohrRadius.js";

export let electrosphereLayers = [];

function getElectronicDistribution(electrons) {
  const result = [];
  let remaining = electrons;

  for (const orb of orbitalSequence) {
    if (remaining <= 0) break;
    const count = Math.min(orb.max, remaining);
    remaining -= count;
    result.push(`${orb.layer}${orb.sub}<sup>${count}</sup>`);
  }

  return result.join(" ");
}

function getAzimutalNumber(electrosphereLayer) {
  // K -> 1
  // L -> 2
  // M -> 3
  // N -> 4
  // O -> 5
  // P -> 6
  // Q -> 7
  // l -> 0 ... n-1 [0,1,2,3] [s,p,d,f]
  let electrosphereLayerIndex =
    electrosphereLayers.indexOf(electrosphereLayer) + 1;
  let azimutalPossibilities = [];
  for (var i = 0; i <= electrosphereLayerIndex - 1; i++) {
    azimutalPossibilities.push(i);
  }
  return azimutalPossibilities;
}

function getMaxElectronsInLayer(azimutalPossibilities) {
  let maxElectrons = 0;
  azimutalPossibilities.forEach((l) => {
    maxElectrons += 2 * (2 * l + 1);
  });
  return maxElectrons;
}

function getMaxElectronsInLastLayer() {
  let lastLayer = electrosphereLayers[electrosphereLayers.length - 1];
  let azimutalPossibilities = getAzimutalNumber(lastLayer);
  return getMaxElectronsInLayer(azimutalPossibilities);
}

export function createElectrosphere() {
  if (protons.length === 0) {
    alert("You need at least one proton");
    return;
  }
  if (electrosphereLayers.length > 6) {
    alert("You can't create more than 7 layers");
    return;
  }

  var lastLayer = electrosphereLayers[electrosphereLayers.length - 1];
  let maxElectrons = getMaxElectronsInLastLayer();

  if (
    electrosphereLayers.length > 0 &&
    lastLayer.electrons.length < maxElectrons
  ) {
    alert(
      "You need to fill all possible electrons of the current layer to create another one!"
    );
    return;
  }

  let electrosphereRadius = getLayerRadius(electrosphereLayers.length + 1);

  const curve = new THREE.EllipseCurve(
    0,
    0,
    electrosphereRadius,
    electrosphereRadius,
    0,
    2 * Math.PI,
    false,
    0
  );
  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xd8d8d8 });
  const orbit = new THREE.Line(geometry, material);

  const maxRotation = 1;
  const minRotation = 0.50;

  orbit.rotation.x = minRotation + Math.random() * (maxRotation - minRotation);
  orbit.rotation.y = minRotation + Math.random() * (maxRotation - minRotation);

  scene.add(orbit);

  electrosphereLayers.push({
    orbit,
    electrons: [],
    radius: electrosphereRadius,
    orbitRotationX: orbit.rotation.x,
    orbitRotationY: orbit.rotation.y,
  });

  document.getElementById("atom-radius").innerHTML = getReprCurrentRadius(electrosphereRadius, electrosphereLayers.length);
}

function buildElectronMesh(maxElectrons, lastLayer) {
  const geometry = new THREE.SphereGeometry(0.1, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    metalness: 0.7,
    roughness: 0.2,
  });
  const electron = new THREE.Mesh(geometry, material);

  electron.phase = ((2 * Math.PI) / maxElectrons) * lastLayer.electrons.length;
  electron.position.set(lastLayer.radius, 0, 0);

  return electron;
}

function addElectronToLayer(lastLayer, electron) {
  lastLayer.orbit.add(electron);
  lastLayer.electrons.push(electron);
}

function updateAfterElectronAdded() {
  updateCounts();

  const protonCount = protons.length;
  const neutronCount = neutrons.length;
  const electronCount = electrosphereLayers.reduce(
    (acc, layer) => acc + layer.electrons.length,
    0
  );

  const eletronicalDistribution = getElectronicDistribution(electronCount);
  document.getElementById("eletronic-distribution").innerHTML =
    eletronicalDistribution;

  updateElementInfo(protonCount, electronCount, neutronCount);
}

export function createElectron() {
  const lastLayer = electrosphereLayers[electrosphereLayers.length - 1];
  if (!lastLayer) {
    alert("You need to create an Electrosphere Layer first!");
    return;
  }

  const maxElectrons = getMaxElectronsInLastLayer();
  if (lastLayer.electrons.length >= maxElectrons) {
    createElectrosphere();
    createElectron();
    return;
  }

  const electron = buildElectronMesh(maxElectrons, lastLayer);
  addElectronToLayer(lastLayer, electron);

  updateAfterElectronAdded();
}

export function resetElectrosphere() {
  document.getElementById("eletronic-distribution").innerHTML = "";

  electrosphereLayers.forEach((layer) => {
    layer.electrons.forEach((electron) => {
      scene.remove(electron);
    });
    scene.remove(layer.orbit);
  });

  electrosphereLayers = [];

  document.getElementById("element-symbol").innerHTML = "--";
  document.getElementById("element-number").innerText = "Atomic Number: --";
  document.getElementById("element-name").innerText = "No element";
  document.getElementById("element-state").innerText = "State: --";

  updateCounts();
}

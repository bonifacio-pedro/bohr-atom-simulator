import { protons, neutrons } from "./nucleus.js";
import { electrosphereLayers } from "./electrosphere.js";

export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function vibrateParticle(particle, amplitude = 0.09) {
  particle.position.x += (Math.random() - 0.5) * 2 * amplitude;
  particle.position.y += (Math.random() - 0.5) * 2 * amplitude;
  particle.position.z += (Math.random() - 0.5) * 2 * amplitude;
}

export function updateCounts() {
  document.getElementById("electron-count").textContent =
    electrosphereLayers.reduce((acc, layer) => acc + layer.electrons.length, 0);
  document.getElementById("proton-count").textContent = protons.length;
  document.getElementById("neutron-count").textContent = neutrons.length;
}

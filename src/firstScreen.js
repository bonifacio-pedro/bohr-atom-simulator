import { createElectron, createElectrosphere } from "./electrosphere";
import { createNeutron, createProton } from "./nucleus";

export function firstVisit() {
  document.getElementById("welcome-overlay").style.display = "none";
  localStorage.setItem("hasVisited", "true");

  createOxygenAtom();
}

function createOxygenAtom() {
  // 8 P, 8 N, 8 E
  for (let i = 0; i < 8; i++) {
    createProton();
  }

  for (let i = 0; i < 8; i++) {
    createNeutron();
  }

  createElectrosphere(); // K
  for (let i = 0; i < 2; i++) {
    createElectron();
  }

  createElectrosphere(); // L
  for (let i = 0; i < 6; i++) {
    createElectron();
  }
}

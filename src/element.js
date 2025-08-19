import { electrosphereLayers } from "./electrosphere";
import { elements } from "./elementsRepr";

export let actualRepr = {};

export function elementFromElectronicDistribution(distributionString) {
  const cleaned = distributionString.replace(/<[^>]+>/g, "");

  const matches = cleaned.match(/(?<=[spdf])\d+/g);
  if (!matches) return null;

  const totalElectrons = matches.map(Number).reduce((a, b) => a + b, 0);

  return totalElectrons;
}

export function updateElementInfo(protonCount, electronCount, neutronCount) {
  const elementIndex = protonCount - 1;

  if (elementIndex >= 0 && elementIndex < elements.length) {
    const el = elements[elementIndex];

    document.getElementById("element-symbol").innerText = el.symbol;
    document.getElementById(
      "element-number"
    ).innerText = `Atomic Number: ${protonCount}`;
    document.getElementById("element-name").innerText = el.name;
    document.getElementById("element-z").innerText = protonCount;
    document.getElementById("element-a").innerText = protonCount + neutronCount;

    let stableText = "STABLE";
    let color = "#66ff00ff";
    if (!isStable(protonCount)) {
      stableText = "INSTABLE";
      color = "#FF0000";
    }
    document.getElementById("e-stable").innerText = stableText;
    document.getElementById("e-stable").style.color = color;

    const charge = electronCount - protonCount;
    if (charge === 0) {
      document.getElementById("element-state").innerText =
        "State: Neutral atom";
    } else if (charge > 0) {
      document.getElementById(
        "element-state"
      ).innerText = `State: Anion (${charge}⁻)`;
    } else {
      document.getElementById(
        "element-state"
      ).innerText = `State: Cation (${-charge}⁺)`;
    }

    actualRepr = {
      name: el.name,
      symbol: el.symbol,
      distribution: document.getElementById("eletronic-distribution").innerText,
      radius: document.getElementById("atom-radius").innerText,
    };
  } else {
    document.getElementById("element-symbol").innerText = "--";
    document.getElementById("element-number").innerText = "Atomic Number: --";
    document.getElementById("element-name").innerText = "No element";
    document.getElementById("element-state").innerText = "State: --";
  }
}

function isStable(protonCount) {
  let n = electrosphereLayers.length;
  let electronCount = 0;

  if (n > 0) {
    electronCount = electrosphereLayers[n - 1].electrons.length;
  }

  // Be (Z=4) e B (Z=5)
  if (protonCount === 4 || protonCount === 5) {
    if (electronCount === 4 || electronCount === 6) {
      return true;
    }
  }

  if (n === 1 && electronCount === 2) {
    return true;
  }

  if (n >= 2) {
    if (electronCount === 8) {
      return true;
    }

    if (protonCount >= 11 && electronCount >= 8 && electronCount <= 12) {
      return true;
    }
  }

  return false;
}

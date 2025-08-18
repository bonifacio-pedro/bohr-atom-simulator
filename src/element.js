import { elements } from "./elementsRepr";

export function elementFromElectronicDistribution(distributionString) {
  const cleaned = distributionString.replace(/<[^>]+>/g, "");

  const matches = cleaned.match(/(?<=[spdf])\d+/g);
  if (!matches) return null;

  const totalElectrons = matches.map(Number).reduce((a, b) => a + b, 0);

  return totalElectrons;
}

export function updateElementInfo(protonCount, electronCount) {
  const elementIndex = protonCount - 1;

  if (elementIndex >= 0 && elementIndex < elements.length) {
    const el = elements[elementIndex];

    document.getElementById("element-symbol").innerText = el.symbol;
    document.getElementById("element-number").innerText = `Atomic Number: ${protonCount}`;
    document.getElementById("element-name").innerText = el.name;

    const charge = electronCount - protonCount;
    if (charge === 0) {
      document.getElementById("element-state").innerText = "State: Neutral atom";
    } else if (charge > 0) {
      document.getElementById("element-state").innerText = `State: Anion (${charge}⁻)`;
    } else {
      document.getElementById("element-state").innerText = `State: Cation (${-charge}⁺)`;
    }
  } else {
    document.getElementById("element-symbol").innerText = "--";
    document.getElementById("element-number").innerText = "Atomic Number: --";
    document.getElementById("element-name").innerText = "No element";
    document.getElementById("element-state").innerText = "State: --";
  }
}
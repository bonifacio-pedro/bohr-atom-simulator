import { elements } from "./elementsRepr";

export function elementFromElectronicDistribution(distributionString) {
  const cleaned = distributionString.replace(/<[^>]+>/g, "");

  const matches = cleaned.match(/(?<=[spdf])\d+/g);
  if (!matches) return null;

  const totalElectrons = matches.map(Number).reduce((a, b) => a + b, 0);

  return totalElectrons - 1;
}

export function updateElementInfo(protonCount, electronCount) {
  if (protonCount > 0 && protonCount <= elements.length) {
    document.getElementById("element-symbol").innerText =
      elements[protonCount - 1].symbol;
    document.getElementById(
      "element-number"
    ).innerText = `Atomic Number: ${protonCount}`;
    document.getElementById("element-name").innerText =
      elements[protonCount - 1].name;

    if (electronCount === protonCount) {
      document.getElementById("element-state").innerText =
        "State: Neutral atom";
    } else if (electronCount < protonCount) {
      const charge = protonCount - electronCount;
      document.getElementById(
        "element-state"
      ).innerText = `State: Cation (${charge}⁺)`;
    } else {
      const charge = electronCount - protonCount;
      document.getElementById(
        "element-state"
      ).innerText = `State: Anion (${charge}⁻)`;
    }
  } else {
    document.getElementById("element-symbol").innerHTML = "--";
    document.getElementById("element-number").innerText = `Atomic Number: --`;
    document.getElementById("element-name").innerText = "No element";
    document.getElementById("element-state").innerText = "State: --";
  }
}

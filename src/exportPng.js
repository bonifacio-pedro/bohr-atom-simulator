import { actualRepr } from "./element";

export function exportPng() {
  const glCanvas = document.querySelector("canvas");
  const image = glCanvas.toDataURL("image/png");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = glCanvas.width;
  canvas.height = glCanvas.height;

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";

    let x = 20;
    let y = canvas.height - 80;

    ctx.fillText(`Element: ${actualRepr.name} (${actualRepr.symbol})`, x, y);
    ctx.fillText(`Distribution: ${actualRepr.distribution}`, x, y + 25);
    ctx.fillText(`Radius: ${actualRepr.radius}`, x, y + 50);

    const finalImage = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = finalImage;
    link.download = "atom.png";
    link.click();
  };
  img.src = image;
}

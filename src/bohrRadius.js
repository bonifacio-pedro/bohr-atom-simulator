// Reduced bohrRadius in nm
const bohrRadiusNm = 0.0529;
const scaleFactor = 5;

// Here I used the equation rn = n² * r1, where r1 is the Bohr radius constant (distance from the nucleus to the K layer in the Bohr model), 
// I had to increase the scale which is originally at approximately 0.0529nm, I multiplied it by 5 to have a more visible simulation.
export function getLayerRadius(n) {
  let simulatedElectrosphereRadius = bohrRadiusNm * (n * n) * scaleFactor;
  if (n === 1) {
    simulatedElectrosphereRadius *= 2;
  }
  
  return simulatedElectrosphereRadius;
}

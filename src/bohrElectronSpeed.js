const planckConst = 1.054571726e-34; // ħ -> reduced Planck constant
const bohrRadius = 5.29e-11;         // a₀
const electronMass = 9.109e-31;      // m

// The values obtained here can come close to the speed of light, after all it is an atom, for this we will use a scale reducer
const SIMULATION_SCALE = 1e-8;

//  Here I used two equations, the angular momentum equation using the reduced Planck constant n * and the Bohr radius equation.
//  This allows us to abstract it to something - importantly, SIMULATED - like: v = ħ / (m a₀) * (1/n)
export function getActualLayerSpeed(n) {
    let vel = planckConst / (electronMass * bohrRadius * n);
    return vel * SIMULATION_SCALE
}

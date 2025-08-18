import * as THREE from "three";

export function createLights(scene) {
  const light1 = new THREE.PointLight(0xffffff, 100);
  light1.position.set(2, 2, 2);
  scene.add(light1);

  const ambient = new THREE.AmbientLight(0x404040, 50);
  scene.add(ambient);
}

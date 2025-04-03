import { AmbientLight, Scene, SpotLight } from "three";

export function setupLights(scene:Scene) {
  // Ambient light
  const ambLight = new AmbientLight(0xffffff, 0.3);
  scene.add(ambLight);

  // Ceiling Lamp Light
  const CeilingLight = new SpotLight(0xffffff, 10, 50, Math.PI / 2, 0.8, 0.8);
  CeilingLight.position.set(-2.2, 5, 1.4);
  CeilingLight.target.position.set(-2.2, 0, 1.4);
  
  CeilingLight.castShadow = true;
  CeilingLight.shadow.bias = -0.1;

  scene.add(CeilingLight);
  scene.add(CeilingLight.target);

  // Desk Lamp Light
  const DeskLight = new SpotLight(0xffffff, 2, 10, Math.PI / 2, 0.5, 0.5);
  DeskLight.position.set(8.9, 3.3, 8.7);
  DeskLight.target.position.set(7.9, 0.0, 7.7);

  DeskLight.castShadow = true;
  DeskLight.shadow.bias = -0.01;

  scene.add(DeskLight);
  scene.add(DeskLight.target);
}
import { AmbientLight, PointLight, Scene, SpotLight } from "three";

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

export function setupBasicLights(scene:Scene) {
  // Ambient Light
  const ambLight = new AmbientLight(0xffffff, 0.4);
  scene.add(ambLight);

  // Point Light
  const pointLight = new PointLight(0xffffff, 1, 20, 0.1);
  pointLight.position.set(0, 3, 0);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Spot Light
  const spotLight = new SpotLight(0xA020F0, 10, 15, Math.PI / 4, 0.5, 0.1);
  spotLight.position.set(20, 5, 0);
  spotLight.target.position.set(20, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);
  scene.add(spotLight.target);

  // Spot Light 2
  const spotLight2 = new SpotLight(0xFFEA00, 5, 15, Math.PI / 4, 0.5, 0.1);
  spotLight2.position.set(-20, 5, 5);
  spotLight2.target.position.set(-20, 0, 0);
  spotLight2.castShadow = true;
  scene.add(spotLight2);
  scene.add(spotLight2.target);
}
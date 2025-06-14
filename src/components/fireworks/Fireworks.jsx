import { useFireworks } from "../../hooks/useFireworks";
import Firework from "./Firework";

const Fireworks = () => {
  const fireworks = useFireworks((state) => state.fireworks);

  console.log(fireworks);

  return fireworks.map((firework) => (
    <Firework key={firework.id} {...firework} />
  ));
};

export default Fireworks;
/*
<VFXEmitter
emitter="fireworks-particles"
settings={{
  nbParticles: 5000,
  delay: 0,
  spawnMode: "burst",
  colorStart: ["violet", "#50C878"],
  particlesLifetime: [0.1, 2],
  size: [0.01, 0.4],
  startPositionMin: [-0.1, -0.1, -0.1],
  startPositionMax: [0.1, 0.1, 0.1],
  directionMin: [-1, -1, -1],
  directionMax: [1, 1, 1],
  startRotationMin: [degToRad(-90), 0, 0],
  startRotationMax: [degToRad(90), 0, 0],
  rotationSpeedMin: [0, 0, 0],
  rotationSpeedMax: [3, 3, 3],
  speed: [1, 12],
}}
/>*/

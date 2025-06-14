import { useRef, useEffect } from "react";
import { CameraControls, Float, Gltf, Stats, Stars } from "@react-three/drei";
import Fireworks from "./fireworks/Fireworks";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { VFXParticles } from "wawa-vfx";
import { useFireworks } from "../hooks/useFireworks";
import CloudsSet from "./CloudsSet";
import GradientSky from "./GradientSky";

export const Experience = () => {
  const controls = useRef();

  const fireworks = useFireworks((state) => state.fireworks);

  //to make the scene more interesting, dynamic, and to better see the fireworks, we can animate the camera.
  useEffect(() => {
    controls.current.setLookAt(0, 15, 10, 0, 25, 0);
    controls.current.setLookAt(12, 8, 26, 4, 0, 0, true);

    //let's animate the camera to zoom-out when the fireworks are launched:
    if (fireworks.length) {
      controls.current.setLookAt(0, 12, 42, 0, 0, 0, true);
    } else {
      controls.current.setLookAt(12, 8, 26, 4, 0, 0, true);
    }
  }, []);

  useEffect(() => {
    //let's animate the camera to zoom-out when the fireworks are launched:
    if (fireworks.length) {
      controls.current.setLookAt(0, 12, 42, 0, 0, 0, true);
    } else {
      controls.current.setLookAt(12, 8, 26, 4, 0, 0, true);
    }
  }, [fireworks]);

  return (
    <>
      <VFXParticles
        name="fireworks-particles"
        settings={{
          nbParticles: 100000,
          gravity: [0, -9.8, 0],
          renderMode: "billboard",
          intensity: 3,
        }}
      />

      <Stats />
      <CameraControls ref={controls} />
      <directionalLight
        position={[1, 0.5, -10]}
        intensity={2}
        color="#ffe7ba"
      />
      <Stars fade speed={3} count={2000} />
      <CloudsSet />
      <GradientSky />
      <Float
        speed={0.6}
        rotationIntensity={2}
        position-x={4}
        floatIntensity={2}
      >
        <Fireworks />
        <Gltf src="/models/SkyIsland.glb" />
      </Float>

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={1} mipmapBlur />
      </EffectComposer>
    </>
  );
};

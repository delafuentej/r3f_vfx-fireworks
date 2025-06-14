import React from "react";
import { Clouds, Cloud } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { useControls } from "leva";

const CloudsSet = () => {
  const { cloud1Color, cloud2Color, cloud3Color } = useControls("Clouds", {
    cloud1Color: "#B57EDC",
    cloud2Color: "#673AB7",
    cloud3Color: "violet",
  });
  return (
    <Clouds material={MeshBasicMaterial}>
      <Cloud
        position-z={0}
        position-y={-5}
        seed={2}
        scale={2}
        volume={8}
        color={cloud1Color}
        fade={1000}
      />
      <Cloud
        position-z={12}
        position-y={-10}
        seed={1}
        scale={2}
        volume={6}
        color={cloud2Color}
        fade={800}
      />
      <Cloud
        position-z={-8}
        position-y={10}
        seed={5}
        scale={1}
        volume={12}
        color={cloud3Color}
        fade={1000}
      />
    </Clouds>
  );
};

export default CloudsSet;

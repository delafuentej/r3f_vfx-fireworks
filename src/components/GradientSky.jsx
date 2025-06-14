import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { BackSide, Color } from "three";
import { useControls } from "leva";
import { degToRad } from "three/src/math/MathUtils.js";
import gradientVertexShader from "../shaders/gradient/vertex.glsl";
import gradientFragmentShader from "../shaders/gradient/fragment.glsl";

const GradientSky = () => {
  const { colorTop, colorMiddle, colorBottom, blendMiddle, blendIntensity } =
    useControls("Sky", {
      colorTop: "#0e1c3e",
      colorMiddle: "#160f3e",
      colorBottom: "#160c2a",
      blendMiddle: {
        value: 0.12,
        min: 0,
        max: 1,
        step: 0.01,
      },
      blendInntensity: {
        value: 0.06,
        min: 0,
        max: 1,
        step: 0.01,
      },
    });
  return (
    <mesh rotation-x={degToRad(-5)} depthWrite={false} depthTest={false}>
      <sphereGeometry args={[40]} />
      <gradientMaterial
        side={BackSide}
        colorBottom={colorBottom}
        colorTop={colorTop}
        colorMiddle={colorMiddle}
        blendMiddle={blendMiddle}
        blendIntensity={blendIntensity}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const GradientMaterial = shaderMaterial(
  {
    colorTop: new Color("white"),
    colorBottom: new Color("skyblue"),
    colorMiddle: new Color("pink"),
    blendMiddle: 0.2,
    blendIntensity: 1,
  },
  gradientVertexShader,
  gradientFragmentShader
);

extend({ GradientMaterial });

export default GradientSky;

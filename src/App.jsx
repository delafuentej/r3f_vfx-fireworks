import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import Preloader from "./components/Preloader";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <Leva collapsed />
      <Loader />
      <UI />
      <Canvas shadows camera={{ position: [12, 8, 26], fov: 30 }}>
        <color attach="background" args={["#110511"]} />
        {/*  the scene disappeared when the sound was played
         because our whole scene is wrapped in a <Suspense /> component 
         when the sound was loaded it rendered thr fallback of thr Suspense*/}
        <Suspense>
          <Preloader />
          <Experience />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;

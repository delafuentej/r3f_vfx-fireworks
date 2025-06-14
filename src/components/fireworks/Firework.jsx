import React, { useRef, useEffect } from "react";
import { PositionalAudio } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { VFXEmitter } from "wawa-vfx";
import { degToRad } from "three/src/math/MathUtils.js";

const Firework = ({ color, delay, position, velocity }) => {
  const ref = useRef();
  const age = useRef(0);
  const audioRef = useRef();

  useFrame((_, delta) => {
    // to make launch the fireworks from the island we need to update the position based
    // on the velocity and the time passed => useFrame hook
    if (!ref.current) return;
    ref.current.position.x += velocity[0] * delta;
    //ref.current.position.y += velocity[1] * delta;
    ref.current.position.z += velocity[2] * delta;

    // Firewor Curve: the movement of the firework doesn't feel right(moving in a straight line).
    // We need to apply a curve to the movement to make it more natural.
    //To do the calculation we will create a ref named age to keep track of the time passed since
    //the firework was created and adjust the y position based on it.
    ref.current.position.y +=
      velocity[1] * delta + age.current * age.current * -9.0 * delta;
    age.current += delta;
  });

  useEffect(() => {
    setTimeout(() => {
      audioRef.current?.play();
    }, delay * 1000);
  }, []);
  return (
    <>
      <group ref={ref} position={position}>
        {/* Firework explosion */}
        <PositionalAudio
          url="/audio/sfxs/firecracker-corsair-4-95046.mp3"
          distance={20}
          loop={false}
          autoplay={false}
          ref={audioRef}
        />
        <VFXEmitter
          emitter="fireworks-particles"
          settings={{
            nbParticles: 5000,
            delay: delay,
            spawnMode: "burst",
            colorStart: color,
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
        />
        {/* Firework trail 
        -To create a trail, we can spawn particles behind the firework 
        that will fade away over time.
        -As we already have our moving group representing the firework, 
        we can add a VFXEmitter with different settings to create the trail: */}
        <PositionalAudio
          url="/audio/sfxs/firework-whistle-190306.mp3"
          distance={20}
          loop={false}
          autoplay
        />
        <VFXEmitter
          emitter="fireworks-particles"
          settings={{
            duration: delay, //the trail will last as long as the firework before exploding.
            nbParticles: 100 * delay,
            spawnMode: "time",
            delay: 0,
            loop: false,
            colorStart: ["white", "skyblue"],
            particlesLifetime: [0.1, 0.6],
            size: [0.01, 0.05],
            startPositionMin: [-0.02, 0, -0.02],
            startPositionMax: [0.02, 0, 0.02],
            startRotationMin: [0, 0, 0],
            startRotationMax: [0, 0, 0],
            rotationSpeedMin: [-12, -12, -12],
            rotationSpeedMax: [12, 12, 12],
            directionMin: [-1, -1, -1],
            directionMax: [1, 1, 1],
            speed: [0, 0.5],
          }}
        />
      </group>
    </>
  );
};

export default Firework;

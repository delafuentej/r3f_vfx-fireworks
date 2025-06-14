import { create } from "zustand";
import { randInt, randFloat } from "three/src/math/MathUtils.js";

// to manage the  creation of fireworks efficiently: custom-hook useFireworks

const themeColors = {
  classic: [
    ["skyblue", "pink"],
    ["orange", "yellow"],
    ["green", "teal"],
    ["mediumpurple", "indigo"],
    ["#ff9fed", "#e885ff", "#ff85b2", "#d69eff"],
  ],
  love: [
    ["red"],
    ["red", "fuchsia"],
    ["red", "pink"],
    ["pink"],
    ["fuchsia", "yellow"],
  ],
  sea: [
    ["skyblue", "white"],
    ["deepskyblue", "skyblue"],
    ["aquamarine", "mediumaquamarine"],
    ["#368bff"],
  ],
  energetic: [
    ["#FF1744", "#FFD600"],
    ["#2979FF", "#F500A3"],
    ["#76FF03", "#8E24AA"],
    ["#00E5FF", "#FFFFFF"],
    ["#FF6D00", "#FF4081"],
    ["#00FFFF", "#FFD700"],
    ["#00FF00", "#9C27B0"],
    ["#FF5349", "#1DE9B6"],
    ["#FF6D00", "#76FF03", "#00E5FF", "#F500A3"],
    ["#00FFFF", "#FF4081", "#00FF00", "#FFD600"],
    ["#2979FF", "#8E24AA", "#1DE9B6", "#FF5349"],
    ["#FF1744", "#FF6D00", "#FFD700", "#00E5FF"],
    ["#9C27B0", "#F500A3", "#00FFFF", "#FFD600"],
  ],
};
//Launchers- we want to spawn our fireworks on the  designated launchers on the island
// {[1.004, -0.001, 3.284]}

const SPAWN_OFFSET = 0.2;
const spawns = [
  [1.004, -0.001 + SPAWN_OFFSET, 3.284],
  [-1.388, 1.999 + SPAWN_OFFSET, -2.364],
  [-2.35, 2.026 + SPAWN_OFFSET, -1.839],
  [0, 0.494 + SPAWN_OFFSET, 0],
  [1.723, 0.235 + SPAWN_OFFSET, 1.398],
];

const useFireworks = create((set, get) => {
  return {
    // store
    fireworks: [],
    // method create fireworks
    addFirework: (firework) => {
      set((state) => {
        const colors = themeColors[firework.theme];
        return {
          fireworks: [
            ...state.fireworks,
            {
              id: `${Date.now()}-${randInt(0, 100)}-${state.fireworks.length}`,
              //
              position: spawns[randInt(0, spawns.length - 1)],
              //   velocity: the direction and speed of the firework before exploding
              velocity: [randFloat(-8, 8), randFloat(5, 10), randFloat(-8, 8)],
              delay: randFloat(0.8, 2),
              color: colors[randInt(0, colors.length - 1)],
              //time: to know when the firework spawns
              time: Date.now(),
            },
          ],
        };
      });
      // method to remove the firework after 4 seconds
      setTimeout(() => {
        set((state) => ({
          //max delay 2 seconds & max lifetime of particles 2 seconds
          fireworks: state.fireworks.filter(
            (firework) => Date.now - firework.time < 4000
          ),
        }));
      }, 4000);
    },
  };
});

export { useFireworks };

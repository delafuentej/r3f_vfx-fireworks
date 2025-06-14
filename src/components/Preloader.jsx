import { PositionalAudio } from "@react-three/drei";

const Preloader = () => {
  return (
    <>
      {/* By mounting the <PositionalAudio /> components at the top of the App,
     the scene will only be rendered when the sounds are loaded. */}
      <PositionalAudio
        url="/audio/sfxs/firework-whistle-190306.mp3"
        autoplay={false} // to prevent the sounds from playing whe they are loaded
      />
      <PositionalAudio
        url="/audio/sfxs/firecracker-corsair-4-95046.mp3"
        autoplay={false}
      />
    </>
  );
};

export default Preloader;

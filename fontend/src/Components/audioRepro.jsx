// import sound_dowload from "../assets/chat.mp3"
import { Box, Typography } from "@mui/material"
import { Howl } from 'howler';

function AudioRepro({ message }) {
  const sound = new Howl({
  src: [`${message.message}`],
  html5: true,
  preload: true,
  autoplay: true,
  format: ['mp3']
  });
  
  return (
    <Box>
      <audio controls>
        <source src={sound._src} type="audio/mpeg"></source>
        Tu navegador no admite la reproducción de audio.
      </audio>
      <Typography>cambio en mensaje</Typography>
    </Box>
  );
}

export default AudioRepro;
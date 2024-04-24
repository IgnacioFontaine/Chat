// import sound_dowload from "../assets/chat.mp3"
import { Box } from "@mui/material"
import { Howl } from 'howler';
import { getUrlAudio } from "../Redux/actions";
import { useDispatch } from "react-redux";


function AudioRepro({ message }) {
  // const dispatch = useDispatch()
  // const url_dowload = dispatch(getUrlAudio(message))
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
    </Box>
  );
}

export default AudioRepro;
// import { getUrlAudio } from "../Redux/actions";
// import { useDispatch } from "react-redux";
// import sound from "../assets/chat.mp3"
import { Box } from "@mui/material"
import { Howl } from 'howler';


function AudioRepro({message}) {
  const sound = new Howl({
  src: ['https://firebasestorage.googleapis.com/v0/b/notwhatsapp-b1189.appspot.com/o/audio%2Fde31f679-380a-4413-8041-6cfc09030058?alt=media&token=5bfe849d-01d9-476d-a3e2-c8c1077ea39f'],
  html5: true, 
  preload: true,
  autoplay: false 
});
  
  return (
    <Box>
      <audio controls >
        <source src={sound} type="audio/mpeg" />
      </audio>
    </Box>
  );
}

export default AudioRepro;
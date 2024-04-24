// import sound_dowload from "../assets/chat.mp3"
import { Box } from "@mui/material"
import { Howl } from 'howler';
import { getUrlAudio } from "../Redux/actions";
import { useDispatch } from "react-redux";


function AudioRepro({ message }) {
  const dispatch = useDispatch()
  const url_dowload = dispatch(getUrlAudio(message))
//   const sound = new Howl({
//   src: ['https://firebasestorage.googleapis.com/v0/b/notwhatsapp-b1189.appspot.com/o/audio%2Fde31f679-380a-4413-8041-6cfc09030058?alt=media&token=5bfe849d-01d9-476d-a3e2-c8c1077ea39f'],
//   html5: true,
//   preload: true,
//   autoplay: false,
//   format: ['mp3']
  // });
  console.log(url_dowload);
  
  return (
    <Box>
      <audio controls >
        {/* <source src={sound._src} type="audio/mpeg"/> */}
      </audio>
    </Box>
  );
}

export default AudioRepro;
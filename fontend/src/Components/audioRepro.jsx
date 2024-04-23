import { getUrlAudio } from "../Redux/actions";
import { useDispatch } from "react-redux";
import sound from "../assets/chat.mp3"
import { Box } from "@mui/material"

function AudioRepro({message}) {
  const dispatch = useDispatch()
  const url = dispatch(getUrlAudio(message.message))
  
  return (
    <Box>
      <audio controls >
        <source src={url} type="audio/mpeg" />
      </audio>
    </Box>
  );
}

export default AudioRepro;
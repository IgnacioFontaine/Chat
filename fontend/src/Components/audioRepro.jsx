import sound from "../assets/chat.mp3"
import { Box } from "@mui/material"


function AudioRepro({message}) {
  
  return (
    <Box>
      <audio controls >
        <source src={message.message} type="audio/mpeg" />
      </audio>
    </Box>
  );
}

export default AudioRepro;
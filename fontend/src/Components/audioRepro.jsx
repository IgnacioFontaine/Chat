import { Box } from "@mui/material"
import sound from "../assets/chat.mp3"

function AudioRepro() {

  return (
    <Box>
      <audio controls >
        <source src={sound} type="audio/mpeg"></source>
      </audio>
    </Box>
  );
}

export default AudioRepro;
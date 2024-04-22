import { Box, Typography } from "@mui/material"
import sound from "../assets/chat.mp3"

function AudioRepro() {
  const url = sound;

  return (
    <Box>
      <audio controls style={{}}>
        <source src={url} type="audio/mpeg"></source>
      </audio>
    </Box>
  );
}

export default AudioRepro;
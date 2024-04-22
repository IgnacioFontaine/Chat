import { Box } from "@mui/material"

function AudioRepro({sound}) {

  return (
    <Box>
      <audio controls >
        <source src={sound} type="audio/mpeg"></source>
      </audio>
    </Box>
  );
}

export default AudioRepro;
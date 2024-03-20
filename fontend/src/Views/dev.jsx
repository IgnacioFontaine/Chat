import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { io } from "socket.io-client";


const socket = io.connect("http://localhost:3001")

export default function Dev() {
  const [nombre, setNombre] = useState("");
  const [sala, setSala] = useState("");

  const ingresarSala = () => {
    if (nombre != "" && sala != "") {
      socket.emit('ingreso_sala', sala)
    }
  }



  return (
    <>
      <Box>
        <Typography variant="h2">Unirme al chat</Typography>
        <Box>
          <TextField
              size="small"
              placeholder="Nombre. . ."
              name="nombre"
              variant="outlined"
              onChange={event => setNombre(event.target.value)}
          />
          
          <TextField
              size="small"
              placeholder="Sala. . ."
              name="sala"
              variant="outlined"
              onChange={event => setSala(event.target.value)}
            />
          <Button
          onClick={ingresarSala}
          >
            Join
          </Button>
          
        </Box>
        <Box></Box>
      </Box>
    </>
  )
}
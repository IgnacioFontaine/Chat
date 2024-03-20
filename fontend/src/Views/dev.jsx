import Rooms from "../Components/rooms";
import { Box } from "@mui/material";
import { useState } from "react";
import { io } from "socket.io-client";


const socket = io.connect("http://localhost:3001")

export default function Dev() {
  const [nombre, setNombre] = useState("");
  const [sala, setSala] = useState("");
  return (
    <>
      <Box>

      </Box>
    </>
  )
}
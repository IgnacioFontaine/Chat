import { Box, Button, TextField, Typography, Grid, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";



const socket = io.connect("http://localhost:3001")

function AnotherChat({ socket, username, room }) {
  const [currentMessage, setcurrentMessage] = useState("")
  const [messagesList, setMessagesList] = useState([])

  

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room, 
        author: username,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        id:Math.random()
      }
      console.log("Enviando mensaje: ", info);
      await socket.emit("send_message", info)
      setMessagesList((list) => [...list, info])
      setcurrentMessage("")
    }
  }

  
  useEffect(() => {
    const handlerMessage = data => setMessagesList((list) => [...list, data])
    
    socket.on("recieve_message", handlerMessage)
    return ()=>socket.off("recieve_message", handlerMessage)
  }, [socket])
  
  
  return (
    <Box
      sx={{
        backgroundColor: "#2486",
        height: "95vh",
        width:"145vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        mt:2
      }}
    >
      <Typography variant="h5" fontFamily={"fantasy"}
        sx={{
          backgroundColor: "#4566",
          width: "98.6%",
          textAlign: "center",
          borderRadius: 4,
          p:1
        }}
      >ID Sala: {room}</Typography>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, minHeight: "500px" }}>
        
        {messagesList?.map((message) => (
          <Message key={message.id} message={message} username={username} />
        ))}
        
      </Box>
      <Box sx={{
        p: 1,
        backgroundColor: "#4566",
        width: "98.7%",
        borderRadius: 4
      }}>
        <Grid container justifyContent={"space-evenly"} >
          <Grid item xs={9.5} >
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              name="message"
              variant="outlined"
              onChange={event => setcurrentMessage(event.target.value)}
              value={currentMessage}
            />
          </Grid>
          <Grid item sx={{display:"flex", gap:2}}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon fontSize="large" />}
              onClick={sendMessage}
              sx={{
                bgcolor: `${color_secondary}`,
                height: "4.6vh",
                width: "1.8vw",
                color: "black",
                boxShadow:5,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
            >
            </Button>
            <Avatar sx={{
                bgcolor: `${color_secondary}`,
                height: "4.6vh",
                width: "3vw",
                color: "black",
                boxShadow:5,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}>
              <KeyboardVoiceIcon   />
            </Avatar>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const Message = ({ message, username }) => {
  const isMe = message.author === username;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" :"flex-start",
        mb: 2,
      }}
      key={message.id}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMe ? "row-reverse" :"row" ,
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: isMe ? "secondary.main" : "primary.main"  }} alt={message.author}>
          {isMe ? "Me" : message.author[0]}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isMe ? 0 : 1,
            mr: isMe ? 1 : 0,
            backgroundColor: isMe ? "secondary.light" : "primary.light" ,
            borderRadius: isMe ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
          }}
        >
          <Typography variant="body1">{message.message}</Typography>
          <Typography variant="caption"
            sx={{ display: "block",
        textAlign: "flex-start"}} >{message.time}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};



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
        <Box id="Settings">
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
        <Box id="Chat">
          <AnotherChat socket={socket} username={nombre} room={sala} />
        </Box>
      </Box>
    </>
  )
}
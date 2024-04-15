import { useEffect, useState } from "react"
import {
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { newFirebaseMessage, getMessageByRoom } from "../Redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import backgraund_chat from "../assets/fondo_chat.png"
import { AvatarRoom } from "./avatarRoom";
import { Message } from "./message";

// const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";

function Chat({ socket, username, room }) {
  const [currentMessage, setcurrentMessage] = useState("")
  const [currentFile, setcurrentFile] = useState()
  const [messagesList, setMessagesList] = useState([])
  const dispatch = useDispatch();
  const all_message_room = useSelector((state) => state.notWhatsapp.messages_room);
  const selected_room = useSelector((state) => state.notWhatsapp.select_room);

  function convertirTiempoAMinutos(tiempo) {
  const [horas, minutos] = tiempo.split(':').map(Number);
  return horas * 60 + minutos;
}

// Ordenar los objetos por tiempo
const all_messages_order = all_message_room.sort((a, b) => {
  const tiempoA = convertirTiempoAMinutos(a.time);
  const tiempoB = convertirTiempoAMinutos(b.time);
  return tiempoA - tiempoB;
});
  
  function selectFile(event) {
    setcurrentMessage(event.target.files[0].name)
    setcurrentFile(event.target.files[0])
  }


  const sendMessage = async () => {
    if (username && currentMessage && !currentFile) {
      const info = {
        message: currentMessage,
        type: "text",
        room, 
        author: username,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        id: crypto.randomUUID()
      };
      console.log("Enviando mensaje: ", info);

      await socket.emit("send_message", info)
      dispatch(newFirebaseMessage(info));
      setMessagesList((list) => [...list, info])
      setcurrentMessage("")
      setcurrentFile()
      
    }

    if (username && currentFile) {
    const info = {
      message: currentFile,
      type: "file",
      room,
      author: username,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      id: crypto.randomUUID()
      };

    const reader = new FileReader();
    reader.onload = async (event) => {
      await socket.emit('send_file', { message: event.target.result, info });
      setMessagesList((list) => [...list, info]);
    };
    reader.readAsDataURL(currentFile);
    // dispatch(newFirebaseMessage(info));  
    setcurrentFile(null);
    setcurrentMessage("");
  }

  }


  
  useEffect(() => {
    const handleMessage = (data) => {
      setMessagesList((list) => [...list, data]);
    };

    //Manejo recepción
    socket.on("recieve_message", handleMessage);
    socket.on("recieve_image", handleMessage);
    
    // dispatch(getMessageByRoom(room))

  return () => {
    socket.off("recieve_message", handleMessage);
    socket.off("recieve_image", handleMessage);
  };
  }, [socket, messagesList, selected_room, all_message_room])
  console.log(messagesList);
  
  return (
    <Box
      sx={{
        backgroundColor: "#2486",
        height: "100vh",
        width:"145vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius: 1,
        mt: -1,
      }}
    ><Box
      sx={{
          backgroundColor: "#898989",
          width: "100%",
          height:"67px",
          textAlign: "start",
          borderRadius: 0,
        }}
      > 
        <AvatarRoom name={selected_room.name} id={selected_room.id} />
    </Box>
      <Box sx={{
        flexGrow: 1,
        overflow: "auto",
        p: 2,
        minHeight: "500px",
          backgroundImage: `url(${backgraund_chat})`,
      }}>
        
        {messagesList?.map((message) => (
          <Message key={message.id} message={message} username={username} />
        ))}
        
      </Box>
      <Box sx={{
        p: 1,
        backgroundColor: "#898989",
        width: "100%",
        height:"58px",
        borderRadius: 0
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
              sx={{mt:0.5}}
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
                mt:0.5,
                height: "4.6vh",
                width: "1.8vw",
                color: "black",
                boxShadow:3,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
            >
            </Button>
            <Avatar sx={{
              bgcolor: `${color_secondary}`,
              mt:0.5,
                height: "4.6vh",
                width: "3vw",
                color: "black",
                boxShadow:3,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}>
              <KeyboardVoiceIcon   />
            </Avatar>
            <Avatar sx={{
              bgcolor: `${color_secondary}`,
              mt:0.5,
                height: "4.6vh",
                width: "3vw",
                color: "black",
                boxShadow:3,
                ":hover":
                { bgcolor: `${color_secondary}`, color: "white" }
                
            }}>
              {/* <AttachFileIcon
                name="file"
                variant="outlined"
              /> */}
              <input
                type="file"
                placeholder="File"
                onChange={selectFile}
                style={{ color:"transparent" }} 
              />
            </Avatar>
            
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Chat;




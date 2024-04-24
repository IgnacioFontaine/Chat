import { newFirebaseMessage, getMessageByRoom, newFirebaseFile, newFirebaseAudio } from "../Redux/actions";
import { Box, TextField, Button, Avatar, Grid, Input, IconButton, InputAdornment } from "@mui/material";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDispatch, useSelector } from 'react-redux';
import backgraund_chat from "../assets/fondo_chat.png"
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react"
import { AvatarRoom } from "./avatarRoom";
import { format } from "@formkit/tempo"
import { Message } from "./message";

const color_secondary = "#3E2A61";

function Chat({ socket, username, room }) {
  const dispatch = useDispatch();
  const [currentAudioFile, setcurrentAudioFile] = useState()
  const [currentFile, setcurrentFile] = useState()
  const [messagesList, setMessagesList] = useState([])
  const [currentMessage, setcurrentMessage] = useState("")
  const all_message_room = useSelector((state) => state.notWhatsapp.messages_room);
  const selected_room = useSelector((state) => state.notWhatsapp.select_room);

  // 👇 Try changing this to "fr"
  const l = "en"
  const t = new Date()

  // Ordena los mensajes primero por fecha y luego por hora
const sortedMessages = all_message_room.sort((a, b) => {
  const dateA = new Date(a.time);
  const dateB = new Date(b.time);
  
  // Compara las fechas
  if (dateA.toDateString() === dateB.toDateString()) {
    // Si las fechas son iguales, compara las horas
    return dateA.getHours() - dateB.getHours();
  } else {
    // Si las fechas son diferentes, ordena por fecha
    return dateA - dateB;
  }
});
  // console.log( sortedMessages);
  
  function selectFile(event) {
    setcurrentMessage(event.target.files[0].name)
    setcurrentFile(event.target.files[0])
  }

  function selectAudioFile(event) {
    setcurrentMessage(event.target.files[0].name)
    setcurrentAudioFile(event.target.files[0])
  }

  const sendMessage = async () => {
    if (username && currentMessage && !currentFile && !currentAudioFile) {
      const info = {
        message: currentMessage,
        type: "text",
        room, 
        author: username,
        time: format(t, "YYYY-MM-DDTHH:mm:ss", l),
        id: crypto.randomUUID(),
      };
      // console.log("Enviando mensaje: ", info);

      await socket.emit("send_message", info)
      dispatch(newFirebaseMessage(info));
       setMessagesList((list) => [...list, info])
      setcurrentMessage("")
      setcurrentFile()
    }

    if (username && currentFile ) {
    const info = {
      message: currentFile,
      type: "file",
      room,
      author: username,
      time: format(t, "YYYY-MM-DDTHH:mm:ss", l),
      id: crypto.randomUUID()
      };
     setMessagesList((list) => [...list, info]);
    dispatch(newFirebaseFile(info))  
    setcurrentFile(null);
    setcurrentMessage("");
    }
    
    if (username && currentAudioFile) {
    const info = {
      message: currentFile,
      type: "audio",
      room,
      author: username,
      time: format(t, "YYYY-MM-DDTHH:mm:ss", l),
      id: crypto.randomUUID()
      };
      setMessagesList((list) => [...list, info]);
     dispatch(newFirebaseAudio(info))  
    setcurrentAudioFile(null);
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
    
     dispatch(getMessageByRoom(room))

  return () => {
    socket.off("recieve_message", handleMessage);
    socket.off("recieve_image", handleMessage);
  };
  }, [socket, messagesList, selected_room])

  const AudioInput = () => {
  return (
    <Input
      type="file"
      accept="audio/mp3"
      disableUnderline
      onChange={selectAudioFile}
      startAdornment={
        <InputAdornment position="start" >
          <KeyboardVoiceIcon />
        </InputAdornment>
      }
    />
  );
};
  
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
        
        {sortedMessages?.map((message) => (
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
              <AudioInput />
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
              <Input
                type="file"
                placeholder="File"
                accept="image/*"
                disableUnderline
                onChange={selectFile}
                endAdornment={
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                  }
              />
            </Avatar>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Chat;




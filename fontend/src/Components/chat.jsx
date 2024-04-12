import { useEffect, useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { newFirebaseMessage, getMessageByRoom } from "../Redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import backgraund_chat from "../assets/fondo_chat.png"

// const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";

const AvatarRoom = ({name, id}) => {
  return (
    <Box key={id}>
      <ListItemButton sx={{
        textAlign: "center",
        mt: 1,
                }} >
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" sx={{backgroundColor:"blueviolet", color:"black"}}>{name[0]}</Avatar>
                </ListItemAvatar>
        <ListItemText sx={{
          display: "flex",
          gap: "10px",
                }} primary={name}  />
              </ListItemButton>
    </Box>
  )
}



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
        id:Math.random()
      }
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
      id: Math.random()
    };
    setMessagesList((list) => [...list, info]);
    const reader = new FileReader();
    reader.onload = async (event) => {
      await socket.emit('send_file', { message: event.target.result, info });
    };
    reader.readAsDataURL(currentFile);
    setcurrentFile(null);
    setcurrentMessage("");
  }
    // if (username && currentFile) {
    //   const info = {
    //     message: currentFile,
    //     type: "file",
    //     room, 
    //     author: username,
    //     time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    //     id:Math.random()
    //   }
    //   // console.log("Enviando mensaje: ", info);

    //   // await socket.emit("send_file", info)
    //   // dispatch(newFirebaseMessage(info));
    //   setMessagesList((list) => [...list, info])
    //   const reader = new FileReader();
    //   reader.onload = async (event) => {
    //     await socket.emit('send_file', { message: event.target.result});
    //   };
    //   reader.readAsDataURL(currentFile);
    //   setcurrentFile()
    //   setcurrentMessage("")
    //   console.log("Enviando archivo:",  currentFile);
    // }
    
  }

  // const sendFile = () => {
  //   if (currentFile) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       socket.emit('send_file', { nombre: currentFile.name, contenido: event.target.result});
  //     };
  //     reader.readAsDataURL(currentFile);
  //   }
  // };

  
  useEffect(() => {
    //Comentada la forma vieja de envío de mensajes
    // const handlerMessage = data => setMessagesList((list) => [...list, data])

    
    // dispatch(getMessageByRoom(room))
    
    // socket.on("recieve_message", handlerMessage)
    // return ()=>socket.off("recieve_message", handlerMessage)

    //Forma nueva:
    const handleMessage = (data) => {
    setMessagesList((list) => [...list, data]);
  };

  socket.on("recieve_message", handleMessage);

  // Agregar manejo para la recepción de imágenes
  socket.on("recieve_image", handleMessage);

  return () => {
    socket.off("recieve_message", handleMessage);
    socket.off("recieve_image", handleMessage);
  };
  }, [socket, messagesList,selected_room])
  
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

function Image(props) {
  const [imageSrc, setImageSrc] = useState("")

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    }
    
  }, [props.blob]);

  return (
    <img style={{width:150, height:"auto"}} src={imageSrc} alt={"File"} ></img>
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
          {isMe ? "Me" : message.author[0].toUpperCase()}
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
          {message.type === "text" ? (
            <Typography variant="body1">{message.message}</Typography>
          ) : (
            <Image blob={message.message} />
          )}
          
          <Typography variant="caption"
            sx={{ display: "block",
        textAlign: "flex-start"}} >{message.time}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
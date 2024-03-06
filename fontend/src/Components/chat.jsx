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


function Chat({ socket, username, room }) {
  
  const [currentMessage, setcurrentMessage] = useState("")
  const [messagesList, setMessagesList] = useState([])

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room,
        author: username,
        time: new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes(),
      }
      await socket.emit("send_message", info)
      setMessagesList((list) => [...list, info])
      // setcurrentMessage("")
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
        height: "85vh",
        width:"45vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        padding:4
      }}
    >
      <Typography variant="h5" fontFamily={"fantasy"}
      sx={{backgroundColor:"#4566", width:"100%", textAlign:"center", borderRadius:3 }}
      >ID Sala: {room}</Typography>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, minHeight: "500px" }}>
        
        {messagesList?.map((message) => (
          <Message key={message.id} message={message} username={username} />
        ))}
        
      </Box>
      <Box sx={{ p: 1, backgroundColor: "#4566", width:"95%", borderRadius:2}}>
        <Grid container spacing={0.5}>
          <Grid item xs={9.5}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              name="message"
              variant="outlined"
              onChange={event => setcurrentMessage(event.target.value)}
            />
          </Grid>
          <Grid item xs={2.5}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}
              sx={{
                mt: 0.3,
                width: "2vw"
              }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Chat;

const Message = ({ message, username }) => {
  const isMe = message.author === username;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMe ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: isMe ? "primary.main" : "secondary.main" }} alt={message.author}>
          {isMe ? "Me" : message.author[0]}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isMe ? 1 : 0,
            mr: isMe ? 0 : 1,
            backgroundColor: isMe ? "primary.light" : "secondary.light",
            borderRadius: isMe ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.message}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

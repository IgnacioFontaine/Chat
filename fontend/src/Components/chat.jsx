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

const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";

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
        height: "90vh",
        width:"50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" fontFamily={"fantasy"}
        sx={{
          backgroundColor: "#4566",
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
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
        width: "96%",
        borderRadius: 3
      }}>
        <Grid container spacing={0.5}>
          <Grid item xs={9.5}>
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
          <Grid item xs={2.5}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}
              sx={{
                bgcolor: `${color_secondary}`,
                height: "4.6vh",
                width:"4vw",
                color: "black",
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
            >
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
        justifyContent: isMe ? "flex-end" :"flex-start",
        mb: 2,
      }}
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
        justifyContent: "flex-start"}} >{message.time}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
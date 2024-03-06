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

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room,
        author: username,
        time: new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes(),
      }
      await socket.emit("send_message", info)
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
    })
  },[socket])
  
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
      <Typography>ID Sala:{room}</Typography>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {/* {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))} */}
        
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

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}>
          {isBot ? "B" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "primary.light" : "secondary.light",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

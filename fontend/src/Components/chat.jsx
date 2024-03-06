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

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages? messages.map((message) => (
          <Message key={message.id} message={message} />
        )):<></>}
        
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              onChange={event => setcurrentMessage(event.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}
            >
              Send
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

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


function Rooms({ socket, username, room }) {
  
  
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
        sx={{
          backgroundColor: "#4566",
          width: "100%",
          textAlign: "center",
          borderRadius: 3
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
        width: "95%",
        borderRadius: 2
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
                width: "2vw",
                height:"4.5vh"
              }}
            >
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Rooms;
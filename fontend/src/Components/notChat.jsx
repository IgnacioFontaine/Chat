import { Box, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';

function NotChat() {
  
  return (
    <Box sx={{
        backgroundColor: "#2486",
        height: "84vh",
        width:"45vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        padding:3
    }}>
      <ChatIcon sx={{ fontSize: 300 }} />
      <Typography variant='h5'
        fontFamily={"fantasy"}
      sx={{textAlign:"center"}}
      >Enter a room and start chatting!</Typography>
    </Box>
  )
}

export default NotChat;
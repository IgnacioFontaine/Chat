import { Box, Typography } from '@mui/material'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import backgraund_chat from "../assets/fondo_chat.png"

function NotChat() {
  
  return (
    <Box
      sx={{
        outline: "1px solid black",
        backgroundColor: "#7F8C8D",
        backgroundImage: `url(${backgraund_chat})`,
        mt:"-8px",
        width: "1318px",
        height: "930px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position:"absolute"
      }}
    >
      <QuestionAnswerIcon
        sx={{
          fontSize: 600,
          alignItems: "center"
        }} />
      <Typography variant='h4'
        fontFamily={"fantasy"}
      sx={{textAlign:"center"}}
      >Enter a room and start chatting!</Typography>
    </Box>
  )
}

export default NotChat;
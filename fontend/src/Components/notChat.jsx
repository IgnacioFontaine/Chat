import { Box, Typography } from '@mui/material'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function NotChat() {
  
  return (
    <Box
      sx={{
        outline: "1px solid black",
        backgroundColor:"#7F8C8D",
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
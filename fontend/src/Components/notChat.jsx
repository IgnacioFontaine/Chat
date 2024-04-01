import { Box, Typography } from '@mui/material'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function NotChat() {
  
  return (
    <Box sx={{
        backgroundColor: "#2486",
        height: "90vh",
        width:"145vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        mt:2
    }}>
      <QuestionAnswerIcon sx={{ fontSize: 500, alignItems:"center"}} />
      <Typography variant='h4'
        fontFamily={"fantasy"}
      sx={{textAlign:"center"}}
      >Enter a room and start chatting!</Typography>
    </Box>
  )
}

export default NotChat;
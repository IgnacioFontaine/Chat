import { Box, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';



function Error() {
  
  return (
    <Box sx={{
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
    }}>
      <Typography variant='h2' fontFamily={"fantasy"}>Set Username & Room!</Typography>
      <ChatIcon sx={{ fontSize: 30 }} />
    </Box>
  )
}

export default Error;
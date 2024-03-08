import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';


function Error() {
  const navigate = useNavigate()
  const error_view = true
  
  return (
    <Box style={{
      backgroundColor:"blueviolet"
    }}>
      <Container sx={{
        height: "100vh",
        width:"100vw",
        display: "flex",
        bgcolor: "transparent"
      }}>
        <Box sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2486",
        height: "90vh",
        width:"45vh",
          justifyContent: "center",
        alignContent:"center",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        padding:4
      }}>
          <Typography variant='h1'>Eror 404!</Typography>
          <Typography variant='h3'>Return to chat</Typography>
          <Button sx={{bgcolor:"blue", color:"black",width: "10vw", height:"3vh", alignSelf:"center"}} onClick={()=>navigate("/chat")}>Chat</Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Error;
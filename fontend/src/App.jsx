import io from 'socket.io-client'
import Chat from './Components/chat'
import SingInForm from './Components/singInForm'
import { Container, Box } from '@mui/material'
import image from "../public/abstract-blue.jpg"

const socket = io.connect("http://localhost:3001")

function App() {
  
  
  return (
    <Box style={{ backgroundImage: `url(${image})` }}>
      <Container sx={{
        height: "100vh",
        width:"100vw",
        display: "flex",
        bgcolor: "transparent",
      }} >
        <SingInForm></SingInForm>
        <Chat socket={socket} username={"Ignacio"} room={"1"} />
      </Container>
    </Box>
  )
}

export default App

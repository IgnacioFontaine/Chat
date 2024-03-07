import io from 'socket.io-client'
import Chat from './Components/chat'
// import SingInForm from './Components/singInForm'
import { Container, Box, TextField, Button, Typography, FormControl } from '@mui/material'
import image from "/abstract-blue.jpg"
import { useState } from 'react'

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
      setShowChat(true);
    } else {
    setShowChat(false);
    }
  }
  
  return (
    <Box style={{
      backgroundImage: `url(${image})`}}>
    
      <Container sx={{
        height: "100vh",
        width:"100vw",
        display: "flex",
        bgcolor: "transparent",
      }} >
        <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2486",
        height: "90vh",
        width:"45vh",
        justifyContent: "flex-start",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        padding:4
      }}>
      
      <Typography variant="h2" align="center" marginY={2} fontFamily={"fantasy"} >Sing Chat</Typography>
      <FormControl
        
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt:5,
          gap: 7
        }}
      >
        
        <TextField
          name="username"
          defaultValue=""
          placeholder='Username'
          onChange={event => 
      setUsername(event.target.value)}
        />
        <TextField
          name="room"
          type='text'
          defaultValue=""
          placeholder='Room'
          onChange={event => setRoom(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth fontFamily={"unset"}
          sx={{
            width: "10vw",
            color:"black"
          }}
        onClick={joinRoom}
        >
          Login
        </Button>
      </FormControl>
    </Container>
        
        {showChat == true ? <Chat socket={socket} username={username} room={room} />:<></>}
      </Container>
    </Box>
  )
}

export default App;
import io from 'socket.io-client'
import Chat from '../Components/chat'
import NotChat from '../Components/notChat'
import { Container, Box, TextField, Button, Typography, FormControl } from '@mui/material'
import { useState } from 'react'
import InfoPopover from '../Components/info'
import { useSelector } from 'react-redux';
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'


const socket = io.connect("http://localhost:3001")
const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";


function Home() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)
  const navigate = useNavigate()

  const user_current = useSelector((state) => state.products.user)


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
      setShowChat(true);
    } else {
    setShowChat(false);
    }
  }

  function handleOut() {
    if (user_current) {
      auth.signOut();
      navigate("/")
    }
  }
  
  return (
    <Box style={{backgroundColor:"blueviolet"}}>
    
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
        width:"50vh",
        justifyContent: "flex-start",
        border:"1px solid",
        borderColor: "gray",
            borderRadius: 4,
        mt:5
      }}>
      
      <Typography variant="h2" align="center" marginY={10} fontFamily={"fantasy"}  >Sing Chat<InfoPopover/> </Typography>
      <FormControl
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt:1,
        gap: 5
        }}
      >
        
        <TextField
          name="username"
          defaultValue=""
          placeholder='Username'
          onChange={event => 
                setUsername(event.target.value)}
              autoComplete='off'
        />
        <TextField
          name="room"
          type='text'
          defaultValue=""
          placeholder='Room'
          onChange={event => setRoom(event.target.value)}
          autoComplete='off'
        />
            <Button
              type="submit"
              variant="contained"
              fontFamily={"unset"}
              sx={{
                bgcolor: `${color_secondary}`,
                color: "black",
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
        onClick={joinRoom}
        >
          Join
        </Button>
            <Button
              variant="contained"
              fontFamily={"unset"}
              sx={{
                bgcolor: `${color_secondary}`,
                color: "black",
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
              onClick={handleOut}
        >
          Logout
        </Button>  
      </FormControl>
        </Container >
        <Box marginY={5}>
          {showChat == true ? <Chat socket={socket} username={username} room={room}  />:<NotChat />}
        </Box>
      </Container>
    </Box>
  )
}

export default Home;
import Chat from '../Components/chat'
import NotChat from '../Components/notChat'
import { Container, Box, Button, Typography, FormControl } from '@mui/material'
import { useState } from 'react'
import InfoPopover from '../Components/info'
import { useSelector } from 'react-redux';
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Rooms from '../Components/rooms'
import io from 'socket.io-client';


const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";

const socket = io.connect("http://localhost:3001");

function Home() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const user_current = useSelector((state) => state.notWhatsapp.user)
  const current_chat = useSelector((state) => state.notWhatsapp.select_room)


  useEffect(() => {
    
    const username_email = user_current.slice(0, user_current.indexOf("@"));
    setUsername(username_email)
    
  }, [user_current]);

  function handleOut() {
    if (user_current) {
      auth.signOut();
      navigate("/")
    }
  }

  
  return (
    <Box style={{backgroundColor:"blueviolet"}}>
      <Container sx={{
        height: "100%",
        width:"100%",
        display: "flex",
        bgcolor: "transparent",
        ml:0
      }} >
        <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#2486",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        mt: 2,
        ml: 0
          }}>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:2}}> 
            <Typography variant="h3" align="center" marginY={1} fontFamily={"fantasy"}  >Not Whatsapp</Typography>
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
          </Box>
      <FormControl
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        }}
          >
            <Rooms />  
      </FormControl>
        </Container >
        <Box >
          {current_chat ? <Chat
            socket={socket}
            username={username}
            room={Number(current_chat.id)}
            key={current_chat.id}
          ></Chat>:<NotChat />}
        </Box>
      </Container>
    </Box>
  )
}

export default Home;
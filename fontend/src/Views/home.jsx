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



const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";


function Home() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)
  const navigate = useNavigate()
  const user_current = useSelector((state) => state.notWhatsapp.user)
  const current_chat = useSelector((state) => state.notWhatsapp.select_room)
  console.log(current_chat);

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
      
          <Typography variant="h2" align="center" marginY={1} fontFamily={"fantasy"}  >Sing Chat<InfoPopover /> </Typography>
          
      <FormControl
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:2
        }}
          >
            <Rooms />
        {/* <TextField
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
              sx={{
                bgcolor: `${color_secondary}`,
                color: "black",
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
              onClick={joinRoom}
        >
          Join
        </Button> */}
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
          <Chat username={username} key={current_chat.id}></Chat>
          {/* {current_chat[0]  ? <Chat  username={username}   />:<NotChat />} */}
        </Box>
      </Container>
    </Box>
  )
}

export default Home;
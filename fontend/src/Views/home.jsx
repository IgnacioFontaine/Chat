import Chat from '../Components/chat'
import NotChat from '../Components/notChat'
import { Container, Box, FormControl } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import Rooms from '../Components/rooms'
import io from 'socket.io-client';


const socket = io.connect("http://localhost:3001");

function Home() {
  const [username, setUsername] = useState('')
  const user_current = useSelector((state) => state.notWhatsapp.user)
  const current_chat = useSelector((state) => state.notWhatsapp.select_room)


  useEffect(() => {
    
    const username_email = user_current.slice(0, user_current.indexOf("@"));
    setUsername(username_email)
    
  }, [user_current]);

  
  return (
    <Box sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        margin: "0px",
        pading:"0px"
      }} >
        <Container sx={{
            height: "50%",
          width: "100%",
          }}>
        <FormControl>
            <Rooms socket={socket} />  
      </FormControl>
        </Container >
        <Container sx={{
            height: "50%",
            width: "100%",
            marginLeft:"-47px"
          }} >
          {current_chat ? <Chat
            socket={socket}
            username={username}
            room={Number(current_chat.id)}
            key={current_chat.id}
          ></Chat>:<NotChat />}
        </Container>
    </Box>
  )
}

export default Home;
import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Components/chat'
import SingInForm from './Components/singInForm'
import { TextField, Button, Container, Typography } from '@mui/material';

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
    } else {
      alert("Complete the fields")
    }
  }
  
  return (
    <>
      <div >
        <Container maxWidth="sm">
      <Typography variant="h4" align="center" marginY={2}>Sing In</Typography>
      <form onSubmit={joinRoom}>
        <TextField
          name="username"
          defaultValue=""
          placeholder='Username...'
          onChange={event => setUsername(event.target.value)}
        />
        <TextField
          name="room"
          type='text'
          placeholder='Room...'
          defaultValue=""
          onChange={event => setRoom(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
        
        <Chat socket={socket} username={username} room={room} />
      </div>
    </>
  )
}

export default App

import { TextField, Button, Container, Typography, FormControl } from '@mui/material';
import { useState } from 'react';
import io from 'socket.io-client'


const socket = io.connect("http://localhost:3001")

const SingInForm = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2486",
        height: "97vh",
        width:"45vh",
        justifyContent: "flex-start",
        border:"1px solid",
        borderColor: "gray",
        borderRadius: 4,
        padding:4
      }}>
      
      <Typography variant="h2" align="center" marginY={2} fontFamily={"fantasy"} >Sing Chat</Typography>
      <FormControl sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt:5,
        gap:7
      }} onSubmit={joinRoom}>
        <TextField
          name="username"
          defaultValue=""
          placeholder='Username'
          onChange={event => setUsername(event.target.value)}
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
        }}>
          Login
        </Button>
      </FormControl>
    </Container>
  );
};

export default SingInForm;
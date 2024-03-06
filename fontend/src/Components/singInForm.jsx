import { TextField, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

const SingInForm = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" marginY={2}>Sing In</Typography>
      <form onSubmit={joinRoom}>
        <TextField
          name="username"
          defaultValue=""
          rules={{
            required: 'Username is required',
          }}
          onChange={event => setUsername(event.target.value)}
        />
        <TextField
          name="room"
          type='text'
          defaultValue=""
          rules={{ required: 'Room is required'}}
          onChange={event => setRoom(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default SingInForm;
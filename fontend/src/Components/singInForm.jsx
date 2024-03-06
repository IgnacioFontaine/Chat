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
          
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default SingInForm;
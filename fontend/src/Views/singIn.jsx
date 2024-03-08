import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { SelfImage } from '../Components/selfImage';

const defaultTheme = createTheme();

const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";

export default function SingInView() {
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInFunction = (event) => {
    event.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // dispatch(setUser(user));
        navigate("/chat");
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  return (
    <Box display={"flex"} >
      <SelfImage />
      <Container
        sx={{
          background: "linear-gradient(to left,#7D56C1 ,blueviolet)"
      }} >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 10,
            p: 5
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: `${color_secondary}`, color:"black" }}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h3" fontFamily={"fantasy"}>
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 5}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete='off'
              autoFocus
              value={email}
              onChange={event=>setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={event=>setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 7, bgcolor: `${color_secondary}`, color: "black",":hover": { bgcolor: `${color_secondary}`, color: "white" } }}
              onClick={singInFunction}
            >
              Sign In
            </Button>
            <Grid container sx={{mt:3}}>
              <Grid item>
                <Link href="/singUp" variant="body2" sx={{textDecoration:"none", color:"black"}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
     </Box>
  );
}
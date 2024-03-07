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
    <Box sx={{ display: "flex" }}  >
      <SelfImage />
      <Container component="main" sx={{
        backgroundColor: `${color_primary}`,
        height:"109vh"
      }} >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 5.7,
            marginBottom:10
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: `${color_secondary}`, color:"black" }}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h3" fontFamily={"fantasy"}>
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              sx={{ mt: 5, mb: 2, bgcolor: `${color_secondary}`, color: "black",":hover": { bgcolor: `${color_secondary}`, color: "white" } }}
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
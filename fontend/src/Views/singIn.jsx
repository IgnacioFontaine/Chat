import { Box, Avatar, Grid, Link, Typography, Container, Checkbox, FormControlLabel, TextField, Button } from "@mui/material"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SelfImage } from '../Components/selfImage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const color_secondary = "#3E2A61";

export default function SingInView() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInFunction = (event) => {
    event.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/chat");
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  return (
    <Box display={"flex"} sx={{
          gap:"150px"
      }}  >
      <SelfImage sx={{
          width:"50%"
      }}  />
      <Container
        sx={{
          width: "50%",
      }} >
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: -2,
            p: 5,
            borderRadius:1,
            backgroundColor: "#898989",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: `${color_secondary}`, color:"black" }}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h3" fontFamily={"fantasy"}>
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{mt: 5, color:"black"}}>
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
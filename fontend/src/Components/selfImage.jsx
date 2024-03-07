import { Box, Typography, Link } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Footer(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/IgnacioFontaine">
        <GitHubIcon fontSize="small" />
      </Link>{' '}
      <Link color="inherit" href="https://www.linkedin.com/in/ignacio-fontaine//">
        <LinkedInIcon fontSize="small" />
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export const SelfImage = () => {
  
  return (
    <Box xs={0} sm={3} md={6}
      sx={{
        justifyContent: "space-evenly",
        alignContent: "center",
        textAlign: "center",
        padding: 10}}>
      <Box>
        <WhatsAppIcon  sx={{ fontSize: 200 }} />
      </Box>
      <Box>
        <Typography variant="h1" sx={{mb:5}} >Not Whatsapp</Typography>
        <Typography variant="body1" >
          We are here for simple, short conversations <br />
          We are the solution whenever WhatsApp does not work!</Typography>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  )
};
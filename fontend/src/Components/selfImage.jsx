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
    <Box 
      sx={{
        display: {
          xs: 'none', sm: 'flex', lg: 'flex', xl: 'flex'
        },
        backgroundColor: "blueviolet"
      }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        p: 5,
        pl:0
      }}>
        <Box>
          <WhatsAppIcon  sx={{ fontSize: 250 }} />
        </Box>
        <Box>
          <Typography variant="h1" sx={{mb:5}} fontFamily={"fantasy"} >Not Whatsapp</Typography>
          <Typography variant="body1" fontFamily={"fantasy"} >
            We are here for simple, short conversations <br />
            We are the solution whenever WhatsApp does not work!</Typography>
        </Box>
        <Box  >
          <Footer />
        </Box>
      </Box>
    </Box>
  )
};
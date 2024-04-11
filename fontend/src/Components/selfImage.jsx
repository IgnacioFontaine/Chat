import { Box, Typography, Link } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Footer(props) {
  return (
    
    <Typography variant="body1" color="text.secondary" align="center" {...props} sx={{ display: "flex", gap:"35px"}}>
      {'Copyright © Ignacio'}
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
          xs: 'none', sm: 'flex-wrap', lg: 'flex', xl: 'flex'
        },
      }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        alignContent: "center",
        height: "100%",
        width: "600px",
        ml:"100px",
        p: 5,
        pl:0
      }}>
        <Box>
          <WhatsAppIcon  sx={{ fontSize: 250, color:"#3E2A61", filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"}} />
        </Box>
        <Box sx={{textAlign:"center",justifyContent:"center",alignItems:"center", mt:10}}>
          <Typography variant="h1" sx={{mb:5 , color:"#3E2A61", textShadow:"0 3px 3px black" }} fontFamily={"fantasy"} >Not Whatsapp</Typography>
          <Typography variant="h5" fontFamily={"fantasy"} sx={{ color:"#3E2A61", textShadow:"0 1px 1px black" }} >
            We are here for simple, short conversations <br />
            We are the solution whenever WhatsApp does not work!</Typography>
        </Box>
        <Box sx={{mt:2}}  >
          <Footer />
        </Box>
      </Box>
    </Box>
  )
};
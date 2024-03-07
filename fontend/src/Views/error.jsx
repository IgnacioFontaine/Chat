import { Box, Button, Typography } from '@mui/material'
import image from "/abstract-blue.jpg"
import { useNavigate } from 'react-router-dom';


function Error() {
  const navigate = useNavigate()
  
  return (
    <Box style={{
      backgroundImage: `url(${image})`}}>
      <Typography>Error 404</Typography>
      <Button onClick={() => navigate("/")}>Return to Home</Button>
    </Box>
  )
}

export default Error;
import { Box, Typography } from '@mui/material'
import image from "/abstract-blue.jpg"


function SingUpView() {
  
  return (
    <Box style={{
      backgroundImage: `url(${image})`}}>
      <Typography>Sing Up</Typography>
      
    </Box>
  )
}

export default SingUpView;
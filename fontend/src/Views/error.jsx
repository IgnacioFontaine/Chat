import { Box, Button, Typography } from '@mui/material'
import image from "/abstract-blue.jpg"


function Error() {
  
  return (
    <Box style={{
      backgroundImage: `url(${image})`}}>
      <Typography>Error 404</Typography>
      <Button></Button>
    </Box>
  )
}

export default Error;
import { Box } from '@mui/material'
import image from "/abstract-blue.jpg"
import { useNavigate } from 'react-router-dom';


function Error() {
  const navigate = useNavigate()
  const error_view = true
  
  return (
    <Box style={{
      backgroundImage: `url(${image})`
    }}>
      {error_view && navigate("/chat")}
    </Box>
  )
}

export default Error;
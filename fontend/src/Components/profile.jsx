import { Box, Typography, Input} from "@mui/material"
import CardProfile from "./cardProfile";
import { setFirebaseUserPic } from "../Redux/actions";

function Profile() {
  
  function selectFile(event) {
    setcurrentFile(event.target.files[0])
  }
  
  return (
    <Box>
      <CardProfile />
      <Typography>New image</Typography>
      <Typography>New Name</Typography>
      <Box>
        
              <Input
                type="file"
                placeholder="File"
                accept="image/*"
                disableUnderline
                onChange={selectFile}
              />
      </Box>
    </Box>
  );
}

export default Profile;
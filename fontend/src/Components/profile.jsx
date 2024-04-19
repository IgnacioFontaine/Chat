import { Box, Typography, Input} from "@mui/material"
import CardProfile from "./cardProfile";
import { setFirebaseUserPic } from "../Redux/actions";
import { useState } from "react";

function Profile() {
  const [currentFile, setCurrentFile] = useState()

  function selectFile(event) {
    setCurrentFile(event.target.files[0])
  }
  const handleSetFile = () => {
    
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
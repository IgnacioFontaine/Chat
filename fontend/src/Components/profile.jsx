import { Box, Typography, Input, Button} from "@mui/material"
import { setFirebaseUserPic } from "../Redux/actions";
import { useDispatch } from "react-redux";
import CardProfile from "./cardProfile";
import { useState } from "react";

function Profile() {
  const [currentFile, setCurrentFile] = useState()
  const dispatch = useDispatch()

  function selectFile(event) {
    setCurrentFile(event.target.files[0])
  }
  const handleSetFile = () => {
    if (currentFile) {
      dispatch(setFirebaseUserPic(currentFile))
    } else {
      alert("Not image selected")
    }
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
        <Button
          onClick={handleSetFile}
        ></Button>
      </Box>
    </Box>
  );
}

export default Profile;
import { Box, Typography, Input, Button} from "@mui/material"
import { setFirebaseUserPic } from "../Redux/actions";
import { useDispatch } from "react-redux";
import CardProfile from "./cardProfile";
import { useState } from "react";

const color_secondary = "#3E2A61";

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
    //Esto podría ser un acordeón tmb
    <Box>
      {/* <CardProfile />
      <Typography>New image</Typography>
      <Typography>New Name</Typography> */}
      <Box>
              <Input
                type="file"
                placeholder="File"
                accept="image/*"
                disableUnderline
                onChange={selectFile}
        />
        <Button
          sx={{
                bgcolor: `${color_secondary}`,
                mt:0.5,
                height: "4.6vh",
                width: "1.8vw",
                color: "black",
                boxShadow:3,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
          onClick={handleSetFile}
        >Set</Button>
      </Box>
    </Box>
  );
}

export default Profile;
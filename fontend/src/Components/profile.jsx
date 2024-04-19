import { Box, Typography, Input, Button} from "@mui/material"
import { setFirebaseUserPic } from "../Redux/actions";
import { useDispatch } from "react-redux";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
    <Box>
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


function AccordionProfile() {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon
            sx={{
                ":hover":
                  { color: "white" }
              }}
          />}          
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
                height: "36px",
                bgcolor: `#7C7C7C`,
                color: "black",
                boxShadow:1,
                ":hover":
                  { bgcolor: `#7C7C7C`, color: "white" }
              }}
        >
          <Typography>Profile</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
                height: "50px",
                bgcolor: `${color_secondary}`,
                color: "black",
                boxShadow:5,
                ":hover":
              { bgcolor: `${color_secondary}`, color: "white" },
              }}
        >
          <Profile />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default AccordionProfile;
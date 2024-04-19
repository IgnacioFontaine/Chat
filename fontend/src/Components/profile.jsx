import { Box, Typography} from "@mui/material"
import CardProfile from "./cardProfile";

function Profile() {
  
  return (
    <Box>
      <CardProfile />
      <Typography>New image</Typography>
      <Typography>New Name</Typography>
    </Box>
  );
}

export default Profile;
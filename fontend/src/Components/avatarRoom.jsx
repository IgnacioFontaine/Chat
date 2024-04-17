import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


const color_secondary = "#3E2A61";
export const AvatarRoom = ({ name, id }) => {
  return (
    <Box key={id}>
      <ListItemButton sx={{
        textAlign: "center",
        mt: 1,
                }} >
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" sx={{backgroundColor:"blueviolet", color:"black"}}>{name[0]}</Avatar>
                </ListItemAvatar>
        <ListItemText sx={{
          display: "flex",
          gap: "10px",
                }} primary={name}  />
      </ListItemButton>
      <Button
                    variant="contained"
                    fontFamily={"unset"}
                    sx={{
                        justifyContent: "center",
                        height: "30px",
                        bgcolor: `${color_secondary}`,
                        color: "black",
                        ":hover":
                          { bgcolor: `${color_secondary}`, color: "white" }
                      }}
                    // onClick={dispatch(deleteFirestoreRoom(id)) }
                >
                    <ClearIcon sx={{fontSize:"medium"}}/>
                </Button> 
    </Box>
  )
}
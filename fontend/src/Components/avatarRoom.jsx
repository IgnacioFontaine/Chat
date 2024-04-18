import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteFirestoreRoom, selectRoom, getFirebaseRooms } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const color_secondary = "#3E2A61";

export const AvatarRoom = ({ name, id }) => {
  const dispatch = useDispatch()
  const current_uid = useSelector((state) => state.notWhatsapp.user_uid);

  const handleDelete = () => {
    dispatch(deleteFirestoreRoom(id))
    dispatch(selectRoom(null))
    dispatch(getFirebaseRooms(current_uid))
  }
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
        }} primary={name} />
        <Button
                    variant="contained"
                    fontFamily={"unset"}
                    sx={{
                        justifyContent: "center",
                        height: "30px",
                        bgcolor: `transparent`,
                      color: "black",
                        border:"1px solid gray",
                        ":hover":
                          { bgcolor: `transparent`, color: "white" }
                      }}
                    onClick={handleDelete}
                >
                    <ClearIcon sx={{fontSize:"medium"}}/>
                </Button> 
      </ListItemButton>
      
    </Box>
  )
}
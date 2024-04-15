import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Box } from '@mui/material';

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
    </Box>
  )
}
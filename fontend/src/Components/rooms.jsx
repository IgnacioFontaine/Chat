import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { newRoom, selectRoom } from '../Redux/actions';



const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";

function NewRoom() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

    function handleCreate(event) {
      event.preventDefault();
      dispatch(newRoom({ name, id }));
      setName("");
      setId("")
    
  }

  return (
     <Box sx={{width:300}}>
        <TextField
          id="name"
          name='name'
          value={name}
          onChange={event=>setName(event.target.value)}
          label="Name"
          variant="outlined"
          autoComplete='off'
          fullWidth
        />
        <TextField
          id="id"
          label="ID"
          name='id'
          value={id}
          onChange={event=>setId(event.target.value)}
          type='number'
          variant="outlined"
          fullWidth
      />
      <Button
              variant="contained"
              fontFamily={"unset"}
        sx={{
                mt:1,
                bgcolor: `${color_secondary}`,
                color: "black",
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
              startIcon={<AddIcon />}
          
            onClick={handleCreate}
        >
          Add
        </Button>  
    </Box>
  )
}


export default function Rooms() {
  const dispatch = useDispatch();

  const all_rooms = useSelector((state) => state.notWhatsapp.rooms);

  const handleSelect = (room) => {
    dispatch(selectRoom(room))
  }
  
  return (
    <Box>
      <Paper square sx={{ pb: '25px',width:400, borderRadius:2, backgroundColor:"#B94BFF", color:"black" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, fontFamily:"fantasy" }}>
          Salas
        </Typography>
        <Divider />
        <List sx={{ mb: 1, height:300, overflow: 'auto'}}>
          {all_rooms && all_rooms.map(({  name, id }) => (
            (<React.Fragment key={id} onClick={handleSelect({name,id})}>

              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture">{name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={id}  />
              </ListItemButton>
            </React.Fragment>)
          ))}
        </List>
        <Divider />
        <Box sx={{ml:5, mt:1}}>
            <NewRoom />
        </Box>
      </Paper>
    </Box>
  );
}
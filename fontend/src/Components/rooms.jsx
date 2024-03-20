import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Divider, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { newRoom, selectRoom } from '../Redux/actions';

import io from 'socket.io-client'
import InfoPopover from './info';


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
     <Box sx={{width:300, height:150}}>
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
          onChange={event=>setId(Number(event.target.value))}
          type='number'
          variant="outlined"
          fullWidth
      />
      <Box sx={{display:"flex", justifyContent:"space-around", alignContent:"center"}}>
        <Button
              variant="contained"
              fontFamily={"unset"}
        sx={{
                mt:1,
                bgcolor: `${color_secondary}`,
                color: "black",
                boxShadow:5,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
              startIcon={<AddIcon />}
          
            onClick={handleCreate}
        >
          Add Room
        </Button>
        <InfoPopover  />
      </Box>
        
    </Box>
  )
}


// const socket = io.connect("http://localhost:3001")

export default function Rooms({socket}) {
  const dispatch = useDispatch();

  const all_rooms = useSelector((state) => state.notWhatsapp.rooms);

  const current_user = useSelector((state) => state.notWhatsapp.user);

  const username_email = current_user.slice(0, current_user.indexOf("@"));

  const user_avatar = username_email[0].toUpperCase()

  const handleSelect = (room) => {
      dispatch(selectRoom(room))
      socket.emit('join_room', Number(room.id))
    
  }
  
  return (
    <Box sx={{mt:1}}>
      <Paper square sx={{ pb: '25px', width: 400, height:720,borderRadius: 2, backgroundColor: "#B94BFF", color: "black" }}>
        <Box sx={{ display: "flex", alignItems:"center" }}>
          <Avatar sx={{backgroundColor:"blueviolet", color:"black", ml:2 ,boxShadow:3}} >{user_avatar}</Avatar>

        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, fontFamily:"fantasy" }}>
            {username_email}
        </Typography>

        </Box>
        <Divider />
        <List sx={{ height:500, overflow: 'auto'}}>
          {all_rooms && all_rooms.map(({  name, id }) => (
            (<React.Fragment key={id} >

              <ListItemButton onClick={ ()=>handleSelect({name,id})}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" sx={{backgroundColor:"blueviolet", color:"black"}}>{name[0].toUpperCase()}</Avatar>
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
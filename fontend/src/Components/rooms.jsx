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
import { newFirebaseRoom, selectRoom, getFirebaseRooms, deleteFirestoreRoom, getMessageByRoom } from '../Redux/actions';
import InfoPopover from './info';
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AccordionNewRoom from './acordionNewRoom';

const color_primary = "#7D56C1";
const color_secondary = "#3E2A61";


function NewRoom() {
  const dispatch = useDispatch();
  const current_uid = useSelector((state) => state.notWhatsapp.user_uid);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [user_id] = useState(current_uid);

    function handleCreate(event) {
      event.preventDefault();
      // dispatch(newRoom({ name, id, user_id }));
      dispatch(newFirebaseRoom({ name, id, user_id }));
      dispatch(getFirebaseRooms(user_id));
      setName("");
      setId("")
  }

  return (
    <Box sx={{ width: 600}}>
      <Box sx={{ display:"flex", gap:"5px"}}>
        <TextField
          id="name"
          name='name'
          value={name}
          onChange={event=>setName(event.target.value)}
          label="Name"
          variant="outlined"
          autoComplete='off'
          sx={{ width: 180}}
        />
        <TextField
          id="id"
          label="ID"
          name='id'
          value={id}
          onChange={event=>setId(Number(event.target.value))}
          type='number'
          variant="outlined"
          sx={{ width: 180}}
        />
         <Button
              variant="contained"
              fontFamily={"unset"}
          sx={{
            mt: 1.05,
            ml:1,
                borderRadius: "5%",
                height: "36px",
                bgcolor: `${color_secondary}`,
                color: "black",
                boxShadow:5,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
              startIcon={<AddIcon/>}
          
            onClick={handleCreate}
        >
        </Button>
        <InfoPopover  />
      </Box>
    </Box>
  )
}

export default function Rooms({socket}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current_uid = useSelector((state) => state.notWhatsapp.user_uid);
  
  useEffect(() => {
    
    dispatch(getFirebaseRooms(current_uid))
    
  }, []);

  const all_rooms = useSelector((state) => state.notWhatsapp.rooms_firebase)

  const current_user = useSelector((state) => state.notWhatsapp.user);

  const username_email = current_user.slice(0, current_user.indexOf("@"));

  const user_avatar = username_email[0].toUpperCase()

  const justOut = handleOut;

  const handleSelect = (room) => {
    dispatch(selectRoom(room))
    dispatch(getMessageByRoom(room.id))
    socket.emit('join_room', room.id)
    
  }

  function handleOut() {
    if (current_user) {
      auth.signOut();
      navigate("/")
    }
  }
  
  return (
    <Box >
      <Paper square sx={{
        width: 550,
        height: 930,
        borderRadius: 0.5,
        backgroundColor: "#7F8C8D",
        color: "black",
        mt: "-7px",
        ml:"-30px"
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor:"#7C7C7C"
        }}>
          <Avatar sx={{backgroundColor:"blueviolet", color:"black", ml:2 ,boxShadow:3}} >{user_avatar}</Avatar>

        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, fontFamily:"fantasy", mb:2 }}>
            {username_email.toUpperCase()}
          </Typography>
          
        <Button
              variant="contained"
              fontFamily={"unset"}
            sx={{
                justifyContent: "end",
                alignContent: "end",
                marginLeft:"265px",
                boxShadow:5,
                bgcolor: `${color_secondary}`,
                color: "black",
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
              onClick={justOut}
        >
          Logout
        </Button>  

        </Box>
        <Box>
          <AccordionNewRoom />
        </Box>
        <Divider />
        <List sx={{ height:775, overflow: 'auto',}}>
          {all_rooms && all_rooms.map(({  name, id }) => (
            (<React.Fragment key={id} >

              <ListItemButton onClick={() => handleSelect({ name, id })}
              sx={{borderBottom:"0.1px solid gray"}} >
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" sx={{backgroundColor:"blueviolet", color:"black"}}>{name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name.toUpperCase()} secondary={id}  />
              </ListItemButton>
            </React.Fragment>)
          ))}
        </List>
        <Divider />
        <Box sx={{ml:1, mt:1}}>
          {/* <NewRoom /> */}
          {/* <AccordionNewRoom /> */}
        </Box>
      </Paper>
    </Box>
  );
}
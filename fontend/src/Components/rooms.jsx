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


const rooms = [
  {
    id: 1,
    name: 'Trabajo',
    person: 'T',
  },
  {
    id: 2,
    name: 'Familia',
    person: 'F',
  },
  {
    id: 3,
    name: 'Amigos',
    person: 'A',
  },
  {
    id: 4,
    name: 'Notas',
    person: 'N',
  },
  {
    id: 5,
    name: 'Hermanos',
    person: "H",
  },
  {
    id: 6,
    name: 'Juegos',
    person: "H",
  },
  {
    id: 7,
    name: 'Futbol',
    person: "H",
  },
];


function NewRoom() {
  return (
     <Box sx={{width:300}}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="id"
          label="ID"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          backgroundColor="#6E2B98"
          startIcon={<AddIcon  />}
        >
          Add
        </Button>
    </Box>
  )
}


export default function BottomAppBar() {
  return (
    <Box>
      <Paper square sx={{ pb: '25px',width:400, borderRadius:2, backgroundColor:"#B94BFF", color:"black" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0, fontFamily:"fantasy" }}>
          Salas
        </Typography>
        <Divider />
        <List sx={{ mb: 1, maxHeight:300, overflow: 'auto'}}>
          {rooms.map(({ id, name, person }) => (
            <React.Fragment key={id}>

              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture">{person}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name}  />
              </ListItemButton>
            </React.Fragment>
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
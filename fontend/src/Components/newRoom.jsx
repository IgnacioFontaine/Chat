import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoPopover from './info';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { newFirebaseRoom, getFirebaseRooms } from '../Redux/actions';
import { Box, Typography, Button, TextField, AccordionDetails, AccordionSummary, Accordion } from "@mui/material"
import { useState } from 'react';

const color_secondary = "#3E2A61";

function NewRoom() {
  const dispatch = useDispatch();
  const current_uid = useSelector((state) => state.notWhatsapp.user_uid);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [user_id] = useState(current_uid);

    function handleCreate(event) {
      event.preventDefault();
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
          sx={{ width: 180, 
            bgcolor: `#7C7C7C`,
            borderRadius:"5%"
          }}
        />
        <TextField
          id="id"
          label="ID"
          name='id'
          value={id}
          onChange={event=>setId(Number(event.target.value))}
          type='number'
          variant="outlined"
          sx={{ width: 180, 
            bgcolor: `#7C7C7C`,
            borderRadius:"5%"
          }}
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

function AccordionNewRoom() {
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
          <Typography>New Room</Typography>
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
          <NewRoom />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default AccordionNewRoom;
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';


const color_secondary = "#3E2A61";

function NewRoom() {
  const dispatch = useDispatch();
  const current_uid = useSelector((state) => state.notWhatsapp.user_uid);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

    function handleCreate(event) {
      event.preventDefault();
      // dispatch(newRoom({ name, id, user_id }));
      dispatch()
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
      </Box>
    </Box>
  )
}

export default function AccordionNewRoom() {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            height: "36px",
                bgcolor: `${color_secondary}`,
                color: "black",
                boxShadow:5,
                ":hover":
                  { bgcolor: `${color_secondary}`, color: "white" }
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
                  { bgcolor: `${color_secondary}`, color: "white" }
              }}
        >
          <NewRoom />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

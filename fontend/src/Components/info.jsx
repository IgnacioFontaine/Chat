import { Popover, Typography, Button} from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import * as React from 'react';


function InfoPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{
        mt: 1,
        boxShadow: 5,
        backgroundColor: "#3E2A61", color: "black", ":hover":
                  { bgcolor: `#3E2A61`, color: "white" }}}>
        <InfoIcon  />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2, backgroundColor:"#3E2A61", color:"white" }} variant='body2'>
          Enter username & the same room as <br />whoever you want to communicate with, then just chat!
        </Typography>
      </Popover>
    </div>
  );
}

export default InfoPopover;
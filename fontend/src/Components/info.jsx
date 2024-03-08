import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';


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
      <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{backgroundColor:"#3E2A61", color:"black",":hover":
                  { bgcolor: `#3E2A61`, color: "white" }}}>
        <InfoIcon  />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, backgroundColor:"#3E2A61", color:"black" }} variant='body2'>
          Enter username & the same room as <br />whoever you want to communicate with, then just chat!
        </Typography>
      </Popover>
    </div>
  );
}

export default InfoPopover;
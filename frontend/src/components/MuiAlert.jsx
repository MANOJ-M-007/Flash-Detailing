import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

const MuiAlert = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAutoClose = () => {
    setTimeout(() => {
      handleClose();
    }, 3000); // close dialog after 3 seconds
  };
  return (
    <>
    <Button variant="contained" color="primary" onClick={() => {
      setOpen(true);
      handleAutoClose();
    }}>Open Alert Box</Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <p>This is an alert message.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  </>
  )
}

export default MuiAlert

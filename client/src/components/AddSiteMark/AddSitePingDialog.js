import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const AddSitePingDialog = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogContent>
        <DialogContentText>
          Is the site online? <br />
          Wait for it!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}  color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
)
}

export default AddSitePingDialog

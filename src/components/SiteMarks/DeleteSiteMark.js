import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const DeleteSiteMark = props => (
  <Dialog
    open={props.open}
    onClose={props.close}
  >
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>Confirm your want to delete a siteMark</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.close}>
        Cancel
      </Button>
      <Button onClick={props.confirmDelete(props.markId)}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteSiteMark

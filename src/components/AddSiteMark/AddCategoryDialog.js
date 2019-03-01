import React, {useState} from 'react'
import { lowerCase, trim } from 'lodash'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'

const initialCategory = ''
const initialErrorMessage = ''
const AddSitePingDialog = props => {
  const [ categoryName, setCategoryName ] = useState(initialCategory)
  const [ errorMessage, setErrorMessage ] = useState(initialErrorMessage)
  const setCategory = e => setCategoryName(e.target.value)
  const submitCategory = () => {
    const name = trim(categoryName)
    const invalidNames = [ '',  'all' ]
    if ( invalidNames.indexOf(lowerCase(name)) >= 0) {
      setErrorMessage('Invalid name.')
      return
    }
    setErrorMessage(initialErrorMessage)
    props.submitCategory({name})
    props.close()
  }
  const getCategoryLabel = () => errorMessage!=='' ? 'Category name' : errorMessage
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
    >
      <DialogContent>
        <DialogContentText>
          What is going to be the name for the new category?
        </DialogContentText>
        <TextField
          error={errorMessage!==''}
          autoFocus
          margin="dense"
          label={getCategoryLabel()}
          type="text"
          value={categoryName}
          onChange={setCategory}
          fullWidth
        />
        <span style={{color: 'red', fontSize: '0.7em'}}>{errorMessage}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close}  color="secondary">
          Cancel
        </Button>
        <Button onClick={submitCategory}  color="secondary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
)
}

export default AddSitePingDialog

import React, {useState} from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'


const siteMarkFormDefaults = {
  name: '',
  url: '',
  rate: 0,
  stars: 1
}
const AddSitemarkDialog = props => {
  const [formFields, setField] = useState(siteMarkFormDefaults)
  const setFieldValue = field => e => setField({ ...formFields, [field]: e.target.value })
  const handleClose = () => {
    setField(siteMarkFormDefaults)
    props.close()
  }
  const submitForm = () => {
    if (formFields.name === '' || formFields.url === '') return
    const site = {
      ...formFields,
      rate: parseInt(formFields.rate)
    }
    props.submitSite(site)
    setField(siteMarkFormDefaults)
    props.close()
  }
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>
        Add a new site
      </DialogTitle>
      <DialogContent>
        <TextField
          label='Name'
          value={formFields.name}
          onChange={setFieldValue('name')}
          fullWidth
          required
        />
        <TextField
          label='Address'
          value={formFields.url}
          onChange={setFieldValue('url')}
          fullWidth
          required
        />
        <Grid container spacing={24}>
          <Grid item  xs={6}>
            <TextField
              select
              label='Stars'
              value={formFields.stars}
              onChange={setFieldValue('stars')}
              fullWidth
            >
            {
              [1,2,3,4,5].map(rank =>
                <MenuItem key={rank} value={rank}>
                  {rank} ⭐️
                </MenuItem>
              )
            }
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Importance'
              type='number'
              value={formFields.rate}
              onChange={setFieldValue('rate')}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}  color="secondary">
          Cancel
        </Button>
        <Button onClick={submitForm}  color="default">
          Add site
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddSitemarkDialog

import React, {useState} from 'react'
import { PropTypes } from 'prop-types'

import validate from 'validate.js'
import { isNil } from 'lodash'
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
  category: '',
  rate: 0,
  stars: 1
}
const siteFormValidator = {
  name: {
    presence: { allowEmpty: false },
    length: { minimum: 3 }
  },
  url: {
    presence: true,
    url: {
      allowLocal: true
    }
  },
  category: {
    presence: { allowEmpty: false },
    length: { minimum: 11 } // ObjectId is 12 or 24
  },
  rate: {
    numericality: true
  },
  stars: {
    numericality: true
  }
}

const parseSiteValues = fields => ({
  ...fields,
  rate: parseInt(fields.rate)
})

const AddSitemarkDialog = props => {
  const [formFields, setField] = useState(props.formValues)
  const setFieldValue = field => e => setField({ ...formFields, [field]: e.target.value })
  const handleClose = () => {
    setField(siteMarkFormDefaults)
    props.close()
  }
  const submitForm = () => {
    const isValid = validate(formFields, siteFormValidator)
    if (!isNil(isValid)) return  // Missing to show errors
    const site = parseSiteValues(formFields)

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
        <TextField
          select
          label='Category'
          value={formFields.category}
          onChange={setFieldValue('category')}
          fullWidth
        >
        {
          props.categories.map(({name, id}) =>
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          )
        }
        </TextField>
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

AddSitemarkDialog.propTypes = {
  close: PropTypes.func,
  submitSite: PropTypes.func,
  open: PropTypes.bool,
  categories: PropTypes.array,
  formValues: PropTypes.object
}

AddSitemarkDialog.defaultProps = {
  formValues: { ...siteMarkFormDefaults },
}

export default AddSitemarkDialog

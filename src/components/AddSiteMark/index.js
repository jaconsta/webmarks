import React, { useState } from 'react'

import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import AddSiteMarkDialog from './AddSiteMarkDialog'

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const AddSiteMark = props => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const {classes} = props
  const showDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)

  return (
    <>
      <AddSiteMarkDialog open={dialogOpen} close={closeDialog} submitSite={props.submitSite}/>
      <Fab color="default" className={classes.absolute}  onClick={showDialog}>
        <AddIcon/>
      </Fab>
    </>
  )
}

export default withStyles(styles)(AddSiteMark)

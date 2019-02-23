import React, { useState } from 'react'

import AddSiteMarkDialog from './AddSiteMarkDialog'
import AddSitePingDialog from './AddSitePingDialog'
import AddSiteOptionsMenu from './AddSiteOptionsMenu'

const AddSiteMark = props => {
  const [ dialogOpen, setDialogOpen ] = useState(false)
  const [ pingDialogOpen, setPingDialogOpen ] = useState(false)
  const showDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)
  const showPingDialog = () => setPingDialogOpen(true)
  const closePingDialog = () => setPingDialogOpen(false)

  return (
    <>
      <AddSiteMarkDialog open={dialogOpen} close={closeDialog} submitSite={props.submitSite} />
      <AddSitePingDialog  open={pingDialogOpen} handleClose={closePingDialog} />
      <AddSiteOptionsMenu showAddSiteDialog={showDialog} showPingDialog={showPingDialog}/>
    </>
  )
}

export default AddSiteMark

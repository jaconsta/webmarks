import React, { useState } from 'react'

import AddSiteMarkDialog from './AddSiteMarkDialog'
import AddSitePingDialog from './AddSitePingDialog'
import AddCategoryDialog from './AddCategoryDialog'
import AddSiteOptionsMenu from './AddSiteOptionsMenu'

const AddSiteMark = props => {
  const [ dialogOpen, setDialogOpen ] = useState(false)
  const [ categoryDialogOpen, setCategoryDialogOpen ] = useState(false)
  const [ pingDialogOpen, setPingDialogOpen ] = useState(false)
  const showDialog = () => setDialogOpen(true)
  const closeDialog = () => setDialogOpen(false)
  const showPingDialog = () => setPingDialogOpen(true)
  const closePingDialog = () => setPingDialogOpen(false)
  const showCategoryDialog = () => setCategoryDialogOpen(true)
  const closeCategoryDialog = () => setCategoryDialogOpen(false)

  return (
    <>
      <AddSiteMarkDialog
        open={dialogOpen}
        close={closeDialog}
        submitSite={props.submitSite}
        categories={props.categories}
      />
      <AddCategoryDialog
        open={categoryDialogOpen}
        close={closeCategoryDialog}
        submitCategory={props.submitCategory}
      />
      <AddSitePingDialog open={pingDialogOpen} handleClose={closePingDialog} />
      <AddSiteOptionsMenu
        showAddSiteDialog={showDialog}
        showCategoryDialog={showCategoryDialog}
        showPingDialog={showPingDialog}/>
    </>
  )
}

export default AddSiteMark

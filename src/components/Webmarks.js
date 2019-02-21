import React, { useEffect, useState } from 'react'

import SiteMarks from './SiteMarks'
import AddSiteMark from './AddSiteMark'
import ErrorSnackbar from './shared/ErrorSnackbar'
import {
  getSites as getSitesMethod,
  addSite as addSiteMethod
} from '../services/api/sites'

const initialSites = []

const Webmarks = props => {
  const [ sites, setSites ] = useState(initialSites)
  const [ showError, toggleError ] = useState(false)

  const closeError = () => toggleError(false)
  const getSites = async () => {
    try {
      const {sites: newSites} = await getSitesMethod()
      setSites(newSites)
    } catch (e) {
      toggleError(true)
    }
  }
  const addSite = async site => {
    try {
      await addSiteMethod(site)
      getSites()
    } catch (e) {
      toggleError(true)
    }
  }


  useEffect(() => {
    getSites()
  }, [])


  return(
    <div>
      <SiteMarks sites={sites}/>
      <AddSiteMark submitSite={addSite}/>
      <ErrorSnackbar open={showError} onClose={closeError}/>
    </div>
  )
}

export default Webmarks

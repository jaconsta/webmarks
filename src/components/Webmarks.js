import React, { useEffect, useState } from 'react'

import AddSiteMark from './AddSiteMark'
import Login from './Login'
import SiteMarks from './SiteMarks'
import ErrorSnackbar from './shared/ErrorSnackbar'

import { setUserSession as addUserToSession, isUserLoggedIn } from '../services/api/userSession'

import {
  getSites as getSitesMethod,
  addSite as addSiteMethod
} from '../services/api/sites'
import {
  getCategories as getCategoriesMethod,
  addCategory as addCategoryMethod
} from '../services/api/categories'

const initialSites = []
const initialCategories = []
const errorDefault = {
  open: false,
  message: ''
}

const Webmarks = props => {
  const [ sites, setSites ] = useState(initialSites)
  const [ categories, setCategories ] = useState(initialCategories)
  const [ showError, setError ] = useState(errorDefault)

  const closeError = () => setError({...errorDefault})

  const createUserSession = session => {
    addUserToSession(session)
    getWebmarks()
  }

  const getSites = () => {
    if (!isUserLoggedIn()) return
    const f = async () => {
      try {
        const {sites: newSites} = await getSitesMethod()
        setSites(newSites || [])
      } catch (e) {
        setError({
          open: true,
          message: 'Could not load sites.'
        })
      }
    }
    f()
  }
  const getCategories = () => {
    if (!isUserLoggedIn()) return
    const f = async () => {
      try {
        const {categories: newCategories} = await getCategoriesMethod()
        setCategories(newCategories || [])
      } catch (e) {
        setError({
          open: true,
          message: 'Could not load categories.'
        })
      }
    }
    f()
  }

  const getWebmarks = async () => {
    Promise.all([
      getSites(),
      getCategories()
    ])
  }

  const addSite = async site => {
    try {
      await addSiteMethod(site)
      getSites()
    } catch (e) {
      setError({
        open: true,
        message: 'There was an error saving the site'
      })
    }
  }

  const addCategory = async category => {
    try {
      const { id } = await addCategoryMethod(category)
      // No need to do a complete fetch currently
      setCategories([...categories, {...category, id}])
    } catch (e) {
      setError({
        open: true,
        message: 'There was an error saving the category'
      })
    }
  }

  useEffect(getSites, [isUserLoggedIn()])
  useEffect(getCategories, [isUserLoggedIn()])

  if (!isUserLoggedIn()) {
    return <Login createUserSession={createUserSession}/>
  }

  return(
    <div>
      <SiteMarks sites={sites} categories={categories}/>
      <AddSiteMark
        submitSite={addSite}
        submitCategory={addCategory}
        categories={categories}
      />
      <ErrorSnackbar showError={showError} onClose={closeError}/>
    </div>
  )
}

export default Webmarks

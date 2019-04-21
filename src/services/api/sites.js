import { getMethod, postMethod, deleteMethod } from './requests'

export const getSites = () => {
  const path = 'sites/'
  return getMethod(path)
}

export const addSite = site => {
  const path = 'sites/'
  return postMethod(path, site)
}

export const deleteSite = id => {
  const path = `sites/${id}/`
  return deleteMethod(path)
}

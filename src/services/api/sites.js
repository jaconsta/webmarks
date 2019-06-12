import { getMethod, postMethod, deleteMethod, updateMethod } from './requests'

const BASE_PATH = 'sites/'
export const getSites = () => {
  return getMethod(BASE_PATH)
}

export const addSite = site => {
  return postMethod(BASE_PATH, site)
}

export const updateSite = site => {
  const path = `${BASE_PATH}${site.id}/`
  return updateMethod(path, site)
}

export const deleteSite = id => {
  const path = `sites/${id}/`
  return deleteMethod(path)
}

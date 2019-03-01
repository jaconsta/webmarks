import { getMethod, postMethod } from './requests'

export const getSites = () => {
  const path = 'sites/'
  return getMethod(path)
}

export const addSite = site => {
  const path = 'sites/'
  return postMethod(path, site)
}

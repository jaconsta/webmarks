import { getMethod, postMethod } from './requests'

export const getCategories = () => {
  const path = 'categories/'
  return getMethod(path)
}

export const addCategory = category => {
  const path = 'categories/'
  return postMethod(path, category)
}

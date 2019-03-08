import { isNil } from 'lodash'

export const setUserSession = session => {
  const sessionString = JSON.stringify(session)
  localStorage.setItem('userSession', sessionString)
}

export const getUserToken = () => {
  const sessionString = localStorage.getItem('userSession')
  if (isNil(sessionString)) return ''
  const { token } = JSON.parse(sessionString)
  return token
}

export const getUserBearerToken = () => {
  return `Bearer ${getUserToken()}`
}

export const isUserLoggedIn = () => {
  return getUserToken() !==  ''
}

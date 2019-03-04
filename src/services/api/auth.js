import { postMethod } from './requests'
import { API_URL } from '../../constants'

const authURL = `${API_URL}/auth/`

export const registerUser = newUser => {
  const path = `register/`
  return postMethod(path, newUser, {url: authURL})
}

export const loginUser = loginForm => {
  const path = `login/`
  return postMethod(path, loginForm, {url: authURL})
}

export const challengeCodeUser = challengeBody => {
  const path = `password_challenge/`
  return postMethod(path, challengeBody, {url: authURL})
}

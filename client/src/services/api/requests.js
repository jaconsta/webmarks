import { get } from 'lodash'
import { API_URL } from '../../constants'
import { isUserLoggedIn, getUserBearerToken } from './userSession'

const getApiUrl = (options) => get(options, 'url', `${API_URL}/api/`)

const defaultHeaders = {
  'Content-Type': 'application/json'
}

const getAuthorization = () => {
  if (!isUserLoggedIn()) return {}
  return { Authorization: getUserBearerToken() }
}
const buildHeaders = () => {
  return {
    ...defaultHeaders,
    ...getAuthorization()
  }
}

/**
  This should be gone implementing something like axios and defer the
  error to catch.
  */
const processResponse = (res) => {
  if (res.status >= 400) {
    const { status } = res
    if (status === 401 ) {
      throw Error ('missing_loggin')
    }
    throw Error ('Could not process the result.')
  }
  return res.json()
}

export const getMethod = (path, opts) => {
  const headers = buildHeaders()
  const options = {
    headers
  }

  const url = `${getApiUrl(opts)}${path}`
  return fetch(url, options)
  .then(processResponse)
  .catch(e => {throw Error ('Could not process the result.')})
}

export const postMethod = (path, body, opts) => {
  const url = `${getApiUrl(opts)}${path}`
  const method = 'POST'
  const headers = buildHeaders()
  const options = {
    method,
    body: JSON.stringify(body),
    headers
  }
  return fetch(url, options)
  .then(res => {
    if (!res.ok) throw Error()
    return res.json()
  })
  .catch(e => {throw Error ('Could not process the result.')})
}

export const updateMethod = (path, body, opts) => {
  const url = `${getApiUrl(opts)}${path}`
  const method = 'PUT'
  const headers = buildHeaders()
  const options = {
    method,
    body: JSON.stringify(body),
    headers
  }

  return fetch(url, options)
  .then(res => {
    if (!res.ok) throw Error()
    return res.json()
  })
  .catch(e => {throw Error ('Could not process the result.')})
}

export const deleteMethod = (path, body) => {
  const url = `${getApiUrl()}${path}`
  const method = 'DELETE'
  const headers = buildHeaders()
  const options = {
    method,
    body: JSON.stringify(body),
    headers
  }
  return fetch(url, options)
  .then(res => {
    if (!res.ok) throw Error()
    return res.json()
  })
  .catch(e => {throw Error ('Could not process the result.')})
}

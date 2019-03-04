import { get } from 'lodash'
import { API_URL } from '../../constants'

const baseUrl = 'http://localhost:8080/api/'
const getApiUrl = (options) => get(options, 'url', `${API_URL}/api/`)

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: 'x'
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

export const getMethod = path => {
  const headers = {
    ...defaultHeaders
  }
  const options = {
    headers
  }

  const url = `${baseUrl}${path}`
  return fetch(url, options)
  .then(processResponse)
  .catch(e => {throw Error ('Could not process the result.')})
}

export const postMethod = (path, body, opts) => {
  const url = `${getApiUrl(opts)}${path}`
  const method = 'POST'
  const headers = {
    ...defaultHeaders
  }
  const options = {
    method,
    body: JSON.stringify(body),
    headers
  }
  return fetch(url, options)
  .then(res => res.json())
  .catch(e => {throw Error ('Could not process the result.')})
}

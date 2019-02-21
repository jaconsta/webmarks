const baseUrl = 'http://localhost:8080/'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

const getMethod = path => {
  const headers = {
    ...defaultHeaders
  }
  const options = {
    headers
  }

  const url = `${baseUrl}${path}`
  return fetch(url, options)
  .then(res => res.json())
  .catch(e => {throw Error ('Could not process the result.')})
}

const postMethod = (path, body) => {
  const url = `${baseUrl}sites`
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

export const getSites = () => {
  const path = 'sites'
  return getMethod(path)
}

export const addSite = site => {
  const path = 'sites'
  return postMethod(path, site)
}

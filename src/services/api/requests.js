const baseUrl = 'http://localhost:8080/api/'

const defaultHeaders = {
  'Content-Type': 'application/json'
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
  .then(res => res.json())
  .catch(e => {console.log(e); throw Error ('Could not process the result.');})
}

export const postMethod = (path, body) => {
  const url = `${baseUrl}${path}`
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

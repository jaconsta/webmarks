import React from 'react'
import { FullWithWarning } from './styled'

const GoToHttps = () => {
  const { protocol } = window.location

  if (protocol === 'https:') return null

  return (
    <FullWithWarning>
      Consider going to our https version. It's more secure. <br />
      <a href="https://webmarks.jaconsta.com/">GO webmarks https</a>
    </FullWithWarning>
  )
}

export default GoToHttps

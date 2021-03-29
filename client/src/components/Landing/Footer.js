import React from 'react'

import { Footered } from './styled'

const year = new Date().getFullYear()

const Footer = () => (
  <Footered>
    <span>Created by Javier &#169; <a href="https://jaconsta.com">Jaconsta.com</a>.</span>
    <span> {year}</span>
  </Footered>
)

export default Footer

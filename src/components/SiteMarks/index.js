import React from 'react'
import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'

const sites = [
  {name: 'Google', url: 'https://www.google.com/', rate: 3, star: 4},
  {name: 'Facebook', url: 'https://www.facebook.com/', rate: 3, star: 2},
  {name: 'Jaconsta', url: 'https://www.jaconsta.com/', rate: 5, star: 5},
  {name: 'github', url: 'https://github.com/jaconsta', rate: 4, star: 3}
]

const SiteMarks = () => {
  return (
    <div>
      <Grid container spacing={32}>
        {
          sites.map(site =>
            <SiteMark site={site} />
          )
        }
      </Grid>
    </div>
  )
}

export default SiteMarks

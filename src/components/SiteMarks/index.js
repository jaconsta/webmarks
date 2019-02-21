import React from 'react'
import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'

const SiteMarks = props => {
  return (
    <div>
      <Grid container spacing={32}>
        {
          props.sites.map(site =>
            <SiteMark key={site.name} site={site} />
          )
        }
      </Grid>
    </div>
  )
}

export default SiteMarks

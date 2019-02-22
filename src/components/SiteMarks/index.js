import React from 'react'
import { chain } from 'lodash'

import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'

const SiteMarks = props => {
  return (
    <div>
      <Grid container spacing={32}>
        {
          chain(props.sites)
            .sortBy(['rate', 'stars'])
            .map(site =>
              <SiteMark key={site.name} site={site} />
            )
            .value()
        }
      </Grid>
    </div>
  )
}

export default SiteMarks

import React from 'react'
import { chain } from 'lodash'

import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'

const SiteMarkList = props => {
  return (
    <>
      <Grid container spacing={32}>
        {
          chain(props.sites)
            .sortBy(['rate', 'stars'])
            .map(site =>
              <SiteMark key={site.id} site={site} />
            )
            .value()
        }
      </Grid>
    </>
  )
}

export default SiteMarkList

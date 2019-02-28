import React from 'react'
import { chain } from 'lodash'

import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'
import EmptySitemark from './EmptySitemark'

const SiteMarks = props => {

  if (props.sites===null || props.sites.length < 1) {
    return <EmptySitemark />
  }
  
  return (
    <div>
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
    </div>
  )
}

export default SiteMarks

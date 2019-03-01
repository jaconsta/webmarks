import React from 'react'
import { chain, isArray, map, find } from 'lodash'

import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'

const getCategoryName = (categories, id) => find(categories, {id}, { name: 'Unnamed category' }).name

const SiteMarkCategoryItems = props => {
  return (
    <>
      <Grid container spacing={32}>
        {
          chain(props.sites)
            .orderBy([ 'stars', 'rate' ], [ 'desc', 'asc' ])
            .map(site =>
              <SiteMark key={site.id} site={site} />
            )
            .value()
        }
      </Grid>
    </>
  )
}

const SiteMarkCategoryGroup = props => (
  <div>
    <h3>{props.categoryName}</h3>
    <SiteMarkCategoryItems sites={props.sites} />
  </div>
)

const SiteMarkList = props => {
  if (isArray(props.sites)) return <SiteMarkCategoryItems sites={props.sites} />
  return (
    <>
      {
        map(props.sites, (sites, key) => (
          <SiteMarkCategoryGroup
            key={key}
            categoryName={getCategoryName(props.categories, key)}
            sites={sites}
          />
        ))
      }
    </>
  )
}

export default SiteMarkList

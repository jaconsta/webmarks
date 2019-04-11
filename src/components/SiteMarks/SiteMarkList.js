import React from 'react'
import { chain, isArray, map } from 'lodash'

import Grid from '@material-ui/core/Grid'

import SiteMark from './SiteMark'

const getCategoryName = (categories, id) => chain(categories).find({id}).get('name', 'Unnamed category').value()

const SiteMarkCategoryItems = props => {
  return (
    <>
      <Grid container spacing={32}>
        {
          chain(props.sites)
            .orderBy([ 'stars', 'rate' ], [ 'desc', 'asc' ])
            .map(site =>
              <SiteMark key={site.id} site={site} newTab={props.newTab} />
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
    <SiteMarkCategoryItems sites={props.sites} newTab={props.newTab} />
  </div>
)

const SiteMarkList = props => {
  if (isArray(props.sites)) return <SiteMarkCategoryItems sites={props.sites} newTab={props.newTab} />
  return (
    <>
      {
        map(props.sites, (sites, key) => (
          <SiteMarkCategoryGroup
            key={key}
            categoryName={getCategoryName(props.categories, key)}
            sites={sites}
            newTab={props.newTab}
          />
        ))
      }
    </>
  )
}

export default SiteMarkList

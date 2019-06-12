import React from 'react'
import { PropTypes } from 'prop-types'
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
              <SiteMark key={site.id} site={site} newTab={props.newTab} isEditMode={props.isEditMode} showDeleteModal={props.showDeleteModal} showEditModal={props.showEditModal} />
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
    <SiteMarkCategoryItems  showDeleteModal={props.showDeleteModal} showEditModal={props.showEditModal} sites={props.sites} newTab={props.newTab} isEditMode={props.isEditMode} />
  </div>
)

const SiteMarkList = props => {
  if (isArray(props.sites)) return <SiteMarkCategoryItems showDeleteModal={props.showDeleteModal} showEditModal={props.showEditModal} isEditMode={props.isEditMode} sites={props.sites} newTab={props.newTab} />
  return (
    <>
      {
        map(props.sites, (sites, key) => (
          <SiteMarkCategoryGroup
            key={key}
            categoryName={getCategoryName(props.categories, key)}
            showDeleteModal={props.showDeleteModal}
            showEditModal={props.showEditModal}
            sites={sites}
            newTab={props.newTab}
            isEditMode={props.isEditMode}
          />
        ))
      }
    </>
  )
}
SiteMarkList.propTypes = {
  sites: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
  newTab: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
}

export default SiteMarkList

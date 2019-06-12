import React from 'react'
import { PropTypes } from 'prop-types'
import { truncate } from 'lodash'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PlayArrow from '@material-ui/icons/PlayArrow'

import { MarkBottom, MarkLink, MarkTitle } from './styled'

const TopEditActions = props => {
  if (!props.isEditMode) return null
  return (
    <span style={{float: 'right'}}>
      <IconButton aria-label="Edit" onClick={props.showEditModal}>
        <EditIcon />
      </IconButton>

      <IconButton onClick={props.showDeleteModal} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    </span>
  )
}
TopEditActions.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  showEditModal: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
}

const truncateUrl = url => truncate(url, { length: 40 })
const SiteMark = props => {
  const {site: {
    id,
    name,
    url,
    stars=0
  }} = props

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper>
        <Grid item>
        <MarkTitle>{name}<TopEditActions showDeleteModal={props.showDeleteModal(id)} isEditMode={props.isEditMode} showEditModal={props.showEditModal(id)} markId={id}/></MarkTitle>
        <MarkLink><a target={props.newTab ? "_blank": ""} rel="noopener noreferrer" href={url}>{truncateUrl(url)} <PlayArrow /></a></MarkLink>
        <MarkBottom>{'⭐️'.repeat(stars)}</MarkBottom>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default SiteMark

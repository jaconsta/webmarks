import React from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PlayArrow from '@material-ui/icons/PlayArrow'

import { MarkBottom, MarkLink, MarkTitle } from './styled'

const SiteMark = props => {
  const {site: {
    name,
    url,
    rate=0,
    stars=0
  }} = props
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper>
        <Grid item>
        <MarkTitle>{name}</MarkTitle>
        <MarkLink><a target="_blank" rel="noopener noreferrer" href={url}>{url} <PlayArrow /></a></MarkLink>
        <MarkBottom>{'⭐️'.repeat(stars)}</MarkBottom>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default SiteMark

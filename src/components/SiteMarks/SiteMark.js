import React from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PlayArrow from '@material-ui/icons/PlayArrow'

const SiteMark = props => {
  const {site: {
    name,
    url,
    rate=0,
    star=0
  }} = props
  return (
    <Grid item xs={4}>
      <Paper>
        <div>
        <div>{name}</div>
        <div><a target="_blank" rel="noopener noreferrer" href={url}>{url} <PlayArrow /></a></div>
        <div>{rate} | {star}</div>
        </div>
      </Paper>
    </Grid>
  )
}

export default SiteMark

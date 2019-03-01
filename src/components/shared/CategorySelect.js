import React from 'react'
import { map } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'


const CategorySelect = props => {
  const { classes, fullWidth=false } = props
  const handleChange = (e) => {
    console.log(e)
    props.setCategory(e.target.value)
  }
  return (
    <Select
      className={classes.categorySelect}
      value={props.value}
      onChange={handleChange}
      fullWidth={fullWidth}
      label={props.label}
    >
      <MenuItem value="_">
        <em>All</em>
      </MenuItem>
      {
        map(props.categories, ({name, id}) =>
          <MenuItem key={id} value={id}>{name}</MenuItem>
        )
      }
    </Select>
  )
}

export default withStyles()(CategorySelect)

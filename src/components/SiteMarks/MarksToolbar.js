import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'


const styles = {
  categorySelect: {
    minWidth: '130px',
    marginLeft: '15px',
    marginRight: '30px'
  }
}

const MarksToolbar = props => {
  const { classes } = props
  const handleChange = (e) => {
    props.setCategory(e.target.value)
  }
  const handleGroupBy = (e) => {
    props.setGroupCategory(e.target.checked)
  }
  const handleOpenNewTab = e => {
    props.setOpenNewTab(e.target.checked)
  }


  return (
    <Toolbar>
      <Typography color="inherit" variant="subtitle1">Category</Typography>
      <Select
        className={classes.categorySelect}
        value={props.value}
        onChange={handleChange}
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
      <Typography color="inherit" variant="subtitle1">Group</Typography>
      <Checkbox
        color="default"
        checked={props.groupSelected}
        onChange={handleGroupBy}
      />
      <Typography color="inherit" variant="subtitle1">Open new tab</Typography>
      <Checkbox
        color="default"
        checked={props.openNewTabSelected}
        onChange={handleOpenNewTab}
      />
    </Toolbar>
  )
}

MarksToolbar.propTypes = {
  value: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  groupSelected: PropTypes.bool.isRequired,
  setGroupCategory: PropTypes.func.isRequired,
  openNewTabSelected: PropTypes.bool.isRequired,
  setOpenNewTab: PropTypes.func.isRequired
}

export default withStyles(styles)(MarksToolbar)

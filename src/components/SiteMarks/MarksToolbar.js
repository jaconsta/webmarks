import React from 'react'
import PropTypes from 'prop-types'
import { map, lowerCase } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
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
  const handleSearchChange = e => {
    props.handleSearchChange(lowerCase(e.target.value))
  }
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
      <TextField
        placeholder="search"
        className={classes.categorySelect}
        value={props.searchValue}
        onChange={handleSearchChange}
      />
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
      <Button
        onClick={props.toggleEditMode}
      >
        Edit mode
      </Button>
    </Toolbar>
  )
}

MarksToolbar.propTypes = {
  value: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  groupSelected: PropTypes.bool.isRequired,
  setGroupCategory: PropTypes.func.isRequired,
  openNewTabSelected: PropTypes.bool.isRequired,
  setOpenNewTab: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired
}

export default withStyles(styles)(MarksToolbar)

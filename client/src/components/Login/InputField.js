import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'


const styles = (theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginTop: '5px',
      marginBottom: '5px',
      width: '100%'
    }

  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
})

const InputField = props => {
  const { classes } = props
  return (
    <div className={classes.search}>
      <div>
        <InputBase
          placeholder= {props.placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>

  )
}

export default withStyles(styles)(InputField)

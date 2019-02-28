import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TrendingDown from '@material-ui/icons/TrendingDown'

const styles = theme => ({
  paper: {
    width: '500px',
    margin: '50px auto'
  },
  title: {
    paddingTop: '15px',
    fontSize: '1.3em',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  helperText: {
    paddingTop: '30px',
    margin: '0 15px',
    width: '470px',
    textAlign: 'center'
  },
  boldPlus: {
    fontSize: '1.3em',
    fontWeight: 'bold'
  },
  iconPlace: {
    textAlign: 'right'
  }
})
const EmptySitemark = props => {
  const { classes } = props
  return (
    <Paper className={classes.paper}>
      <div className={classes.title}>There aren't any sitemarks yet.</div>
      <div className={classes.helperText}>
        <div>Add some by clicking the <span className={classes.boldPlus}>+</span> button bellow.</div>
        <div className={classes.iconPlace}><TrendingDown/></div>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(EmptySitemark)

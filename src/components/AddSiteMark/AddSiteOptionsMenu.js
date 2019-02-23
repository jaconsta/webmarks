import React, {useRef, useState} from 'react'

import { withStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fab from '@material-ui/core/Fab'
import Grow from '@material-ui/core/Grow'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const AddSiteOptionsMenu = props => {
  const { classes } = props
  const [ showOptions, setShowOptions ] = useState(false)
  const anchorEl = useRef(null)
  const toggleShowOptions = () => {
    setShowOptions(!showOptions)
  }
  const hideShowOptions = () => {
    setShowOptions(false)
  }

  return (
    <>
      <Fab
        buttonRef={anchorEl}
        color="default"
        className={classes.absolute}
        onClick={toggleShowOptions}
      >
        <AddIcon/>
      </Fab>
      <Popper open={showOptions} anchorEl={anchorEl.current} transition disablePortal>
        {
          ({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={
                { transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }
              }
            >
              <Paper>
                <ClickAwayListener onClickAway={hideShowOptions}>
                  <MenuList>
                    <MenuItem onClick={props.showAddSiteDialog}>Sitemark</MenuItem>
                    <MenuItem onClick={props.showPingDialog}>Site ping</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )
        }
      </Popper>
    </>
  )
}

export default withStyles(styles)(AddSiteOptionsMenu)

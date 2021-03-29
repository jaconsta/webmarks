import React from 'react'

import Snackbar from '@material-ui/core/Snackbar'

const position = {
  vertical: 'top',
  horizontal: 'right'
}

const ErrorSnackbar = props => {
  return <Snackbar
    anchorOrigin={position}
    open={props.showError.open}
    onClose={props.onClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.showError.message}</span>}
  />
}

export default ErrorSnackbar

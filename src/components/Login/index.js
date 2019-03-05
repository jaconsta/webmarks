import React, { useState } from 'react'

import { isNil, get } from 'lodash'
import validate from 'validate.js'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/AlternateEmail'

import { registerUser, loginUser, challengeCodeUser} from '../../services/api/auth'

import IconInputField from './IconInputField'
import InputField from './InputField'
import Register from './Register'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  toolbar: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  virtualTab: {
    paddingLeft:'5em'
  },
  actionButtons : {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: '5px',
      marginBottom: '5px'
    }
  }
})

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const PASSWORD = 'PASSWORD'
const titles = {
  [ LOGIN ]: 'Login',
  [ REGISTER ]: 'Register',
  [ PASSWORD ]: 'Code sent to email'
}
const getTitle = step => titles[step]
const registerFormFields = {
  email: '',
  firstName: '',
  lastName: ''
}
const registerValidator = {
  email: {
    email: true
  },
  firstName: {
    presence: { allowEmpty: false }
  },
  lastName: {
    presence: { allowEmpty: false }
  }
}
const loginStepValidator = {
  userEmail: {
    email: true
  }
}
const passwordStepValidator = {
  ...loginStepValidator,
  userPassword: {
    presence: {
      allowEmpty: false,
      message: "^Type the code from email"
    },
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "^It doesn't look like ours."
    }
  }
}

const Login = props => {
  const [ loginStep, setLoginStep ] = useState(LOGIN)
  const [ userEmail, setUserEmail ] = useState('')
  const [ register, setRegister ] = useState(registerFormFields)
  const [ userPassword, setUserPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const { classes } = props
  const setValue = f => e => f(e.target.value)
  const setRegisterField = field => e => setRegister({...register, [field]: e.target.value})
  const submitRegister = async () => {
    const isInvalid = validate(register, registerValidator, {format: "flat"})
    if (!isNil(isInvalid)) return setErrorMessage(get(isInvalid, '0'))
    try {
      await registerUser(register)
      setUserEmail(setUserEmail.email)
      setLoginStep(PASSWORD)
    } catch (e) {
      setErrorMessage('Ohh oh! Something went wrong')
    }
  }
  const submitLoginForm = async () => {
    const isInvalid = validate({ userEmail }, loginStepValidator)
    if (!isNil(isInvalid)) return setErrorMessage(get(isInvalid, 'userEmail.0'))

    try {
      await loginUser({email: userEmail})
      setLoginStep(PASSWORD)
    } catch (e) {
      setErrorMessage('Ohh oh! Something went wrong')
    }
  }
  const submitPasswordForm = async () => {
    const isInvalid = validate({ userEmail, userPassword }, passwordStepValidator)
    if (!isNil(get(isInvalid, 'userEmail'))) {
      setUserPassword('')
      setLoginStep(LOGIN)
      return
    }
    if (!isNil(isInvalid)) return setErrorMessage(get(isInvalid, 'userPassword.0', 'Incorrect login form'))

    try {
      const token = await challengeCodeUser({email: userEmail, code:userPassword})
      props.createUserSession({email: userEmail, token})
    } catch (e) {
      setErrorMessage('Ohh oh! Something went wrong')
    }
  }
  const resetAll = () => {
    setLoginStep(LOGIN)
    setUserEmail('')
    setUserPassword('')
    setErrorMessage('')
    setRegister(registerFormFields)
  }
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap>
            {getTitle(loginStep)}
          </Typography>

          {
            loginStep === LOGIN  &&
              <>
                <IconInputField
                  placeholder= "Your email"
                  icon={<EmailIcon />}
                  value={userEmail}
                  onChange={setValue(setUserEmail)}
                />

                <Button
                  onClick={submitLoginForm}
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {setLoginStep(REGISTER)}}
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                >
                  Register
                </Button>
              </>
          }

          {
            loginStep === REGISTER  &&
              <>
                <Register
                  value={Register}
                  onChange={setRegisterField}
                  onSubmite={submitRegister}
                />
                <Button
                  onClick={submitRegister}
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                >
                  Submit
                </Button>
              </>
          }

          {
            loginStep === PASSWORD  &&
              <>
                <InputField
                  placeholder= "Email code"
                  value={ userPassword }
                  onChange={ setValue(setUserPassword) }
                />
                <Button
                  onClick={submitPasswordForm}
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                >
                  Continue
                </Button>
              </>
          }

          {
            loginStep !== LOGIN  &&
              <Button
                onClick={resetAll}
                className={classes.actionButtons}
                variant="contained"
                color="default"
              >
                Back
              </Button>
          }

          {
            errorMessage !== '' &&
              <div>
                {errorMessage}
              </div>
          }

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Login)

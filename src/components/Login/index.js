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
  formContainer: {
    display: 'contents'
  },
  actionButtons : {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: '5px',
      marginBottom: '5px'
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '5px',
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
  const [ isLoginLoading, setIsLoginLoading ] = useState(false)
  const { classes } = props
  const setValue = f => e => f(e.target.value)
  const setRegisterField = field => e => setRegister({...register, [field]: e.target.value})
  const submitRegister = async e => {
    e.preventDefault()
    if (isLoginLoading) return
    const isInvalid = validate(register, registerValidator, {format: "flat"})
    if (!isNil(isInvalid)) return setErrorMessage(get(isInvalid, '0'))
    setIsLoginLoading(true)
    try {
      await registerUser(register)
      await loginUser({email: register.email})
      setUserEmail(register.email)
      setLoginStep(PASSWORD)
    } catch (e) {
      setErrorMessage('Ohh oh! Something went wrong')
    } finally {
      setIsLoginLoading(false)
    }
  }
  const submitLoginForm = async e => {
    e.preventDefault()
    if (isLoginLoading) return
    const isInvalid = validate({ userEmail }, loginStepValidator)
    if (!isNil(isInvalid)) return setErrorMessage(get(isInvalid, 'userEmail.0'))
    setIsLoginLoading(true)

    try {
      await loginUser({email: userEmail})
      setLoginStep(PASSWORD)
    } catch (e) {
      setErrorMessage('Verify the provided email')
    } finally {
      setIsLoginLoading(false)
    }
  }
  const submitPasswordForm = async e => {
    e.preventDefault()
    if (isLoginLoading) return
    const isInvalid = validate({ userEmail, userPassword }, passwordStepValidator)
    if (!isNil(get(isInvalid, 'userEmail'))) {
      setUserPassword('')
      setLoginStep(LOGIN)
      return
    }
    if (!isNil(isInvalid)) return setErrorMessage(get(isInvalid, 'userPassword.0', 'Incorrect login form'))
    setIsLoginLoading(true)

    try {
      const token = await challengeCodeUser({email: userEmail, code:userPassword})
      props.createUserSession({email: userEmail, ...token})
    } catch (e) {
      setErrorMessage('Ohh oh! Something went wrong')
    } finally {
      setIsLoginLoading(false)
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
                <form className={classes.formContainer} onSubmit={submitLoginForm}>
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
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
                <Button
                  onClick={() => {setLoginStep(REGISTER)}}
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                  disabled={isLoginLoading}
                >
                  Register
                </Button>
              </>
          }

          {
            loginStep === REGISTER  &&
              <form className={classes.formContainer} onSubmit={submitRegister}>
                <Register
                  value={Register}
                  onChange={setRegisterField}
                />
                <Button
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                  type="submit"
                  disabled={isLoginLoading}
                >
                  Submit
                </Button>
              </form>
          }

          {
            loginStep === PASSWORD  &&
              <form className={classes.formContainer} onSubmit={submitPasswordForm}>
                <InputField
                  placeholder= "Email code"
                  value={ userPassword }
                  onChange={ setValue(setUserPassword) }
                />
                <Button
                  className={classes.actionButtons}
                  variant="contained"
                  color="default"
                  type="submit"
                  disabled={isLoginLoading}
                >
                  Continue
                </Button>
              </form>
          }

          {
            loginStep !== LOGIN  &&
              <Button
                onClick={resetAll}
                className={classes.actionButtons}
                variant="contained"
                color="default"
                disabled={isLoginLoading}
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

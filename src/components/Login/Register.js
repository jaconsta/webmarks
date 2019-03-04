import React from 'react'

import InputField from './InputField'

const Register = props => {
  return (
    <>
      <InputField
        placeholder="email"
        value={props.value.email}
        onChange={props.onChange('email')}
      />
      <InputField
        placeholder="First name"
        value={props.value.firstName}
        onChange={props.onChange('firstName')}
      />
      <InputField
        placeholder="Last name"
        value={props.value.lastName}
        onChange={props.onChange('lastName')}
      />
    </>
  )
}

export default Register

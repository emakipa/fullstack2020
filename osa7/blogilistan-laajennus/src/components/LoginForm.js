import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index.js'

const LoginForm = ({ loginUser }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()

    loginUser({
      username: username.input.value,
      password: password.input.value,
    })

    username.clear()
    password.clear()
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            { ...username.input }
          />
        </div>
        <div>
          password
          <input
            id='password'
            { ...password.input }
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm

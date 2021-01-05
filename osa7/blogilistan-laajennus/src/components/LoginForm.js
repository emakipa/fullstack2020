import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index.js'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            { ...username.input }
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            { ...password.input }
          />
          <br />
          {(username.input.value && password.input.value) ?
            <Button variant="primary" type="submit">
              login
            </Button> :
            <Button variant="primary" type="submit" disabled>
              login
            </Button>
          }
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm

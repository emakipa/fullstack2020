import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const CreateUserForm = ({ show, setError, setPage }) => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const [ createUser ] = useMutation(CREATE_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createUser({ variables: { username, favoriteGenre } })
    
    setUsername('')
    setFavoriteGenre('')
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          favorite genre <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default CreateUserForm
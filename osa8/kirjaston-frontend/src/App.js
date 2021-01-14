
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import CreateUserForm from './components/CreateUserForm'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import { CURRENT_USER } from './queries'

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const client = useApolloClient()

  const [getUser, result] = useLazyQuery(CURRENT_USER, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  const fetchUser = () => {
    getUser()
    setPage('recommend')
  }
 
  useEffect(() => {
    if (result.data) {
      setCurrentUser(result.data.me)
    }
  }, [result]) // eslint-disable-line

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={fetchUser}>recommend</button>}
        {!token && <button onClick={() => setPage('createUser')}>add user</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'} setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} setError={notify}
      />

      {currentUser && 
        <Recommend
          show={page === 'recommend'} setError={notify} user={currentUser}
        />
      }
      
      <CreateUserForm
        show={page === 'createUser'} setError={notify} setPage={setPage}
      />

      <LoginForm
        show={page === 'login'} setError={notify} setToken={setToken} setPage={setPage}
      />

    </div>
  )
}

export default App
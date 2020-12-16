import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs, createNewBlog } from './reducers/blogReducer'

const App = () => {
  const [ user, setUser ] = useState(null)

  //access to component's functions outside
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {

    try {
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedUser)
      )
      //set token for a logged user
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleCreateNewBlogObject = async (blogObject) => {

    try {
      dispatch(createNewBlog(blogObject))
      dispatch(setNotification(blogObject.author !== '' ? `a new blog ${blogObject.title} by ${blogObject.author} added` : `a new blog ${blogObject.title} added`, 5))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <Togglable buttonLabel="login">
          <LoginForm
            loginUser={handleLogin}
          />
        </Togglable>

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button> </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={handleCreateNewBlogObject}
        />
      </Togglable>

      <BlogList user={user} />
      
    </div>
  )
}

export default App

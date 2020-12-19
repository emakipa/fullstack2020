import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route
} from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs, createNewBlog } from './reducers/blogReducer'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

const App = () => {

  let user = useSelector(state => state.user)

  //access to component's functions outside
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [dispatch])

  const handleLogin = async (userObject) => {
    dispatch(loginUser(userObject))
  }

  const handleLogout = async () => {
    try {
      dispatch(logoutUser())
      blogService.setToken(null)
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  const handleCreateNewBlogObject = async (blogObject) => {
    dispatch(createNewBlog(blogObject))
    dispatch(setNotification(blogObject.author !== '' ? `a new blog ${blogObject.title} by ${blogObject.author} added` : `a new blog ${blogObject.title} added`, 5))
    blogFormRef.current.toggleVisibility()
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

      <Switch>
        <Route path='/create'>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={handleCreateNewBlogObject}
            />
          </Togglable>
        </Route>
        <Route path='/blogs'>
          <BlogList />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>

    </div>
  )
}

export default App
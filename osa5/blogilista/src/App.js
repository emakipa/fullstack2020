import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])

  //access to component's functions outside
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      setMessage(exception.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleCreateNewBlogObject = async (blogObject) => {

    try {
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      setMessage(addedBlog.author !== '' ? `a new blog ${addedBlog.title} by ${addedBlog.author} added` : `a new blog ${addedBlog.title} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setMessage(exception.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleUpdateBlogObject = async (blogObject) => {
    try {
      const blogId = blogObject.id
      const changedBlog = { ...blogObject, likes: blogObject.likes +=1 }

      const updatedBlog = await blogService.update(blogId, changedBlog)
      setMessage(`blog ${updatedBlog.title} updated`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      setMessage(exception.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleRemoveBlogObject = async (blogObject) => {

    let choice = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)

    if (choice) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        setMessage(`blog ${blogObject.title} removed`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        setMessage(exception.response.data.error)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification message={message} type={messageType}/>

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

      <Notification message={message} type={messageType}/>

      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button> </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={handleCreateNewBlogObject}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} onClickUpdate={() => handleUpdateBlogObject(blog)} onClickRemove={() => handleRemoveBlogObject(blog)} user={user}/>
      )}
    </div>
  )
}

export default App

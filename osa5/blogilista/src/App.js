import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')
  const [ username, setUsername ] = useState('') 
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null) 
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ blogs, setBlogs ] = useState([])

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      //set token for a logged user
      blogService.setToken(user.token) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleCreateNewBlogObject = async (event) => {
    event.preventDefault()
    
    try {
      const blogObject = {
        title: title === '' ? undefined : title,
        author: author,
        url: url === '' ? undefined : url,
      }

      const addedBlog = await blogService.create(blogObject) 
      setBlogs(blogs.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(author !== '' ? `a new blog ${title} by ${author} added` : `a new blog ${title} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Blog title or/and url undefined')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        
        <Notification message={message} type={messageType}/>
        
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>  
    )    
  }
  
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} type={messageType}/>
      
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button> </p>
        
      <h2>create new</h2>
        <form onSubmit={handleCreateNewBlogObject}>
          <div>
            title
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
            author
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
            url
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
        </form>
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )  
}

export default App

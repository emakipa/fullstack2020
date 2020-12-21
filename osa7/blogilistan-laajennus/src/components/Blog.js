import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = () => {

  const dispatch = useDispatch()

  const history = useHistory()

  //get current logged user
  const user = useSelector(state => state.user)

  //get all blogs
  const blogs = useSelector(state => state.blog)

  //get id
  const id = useParams().id

  //find blog with id
  const blog = blogs.find(blog => blog.id === id)

  const handleUpdateBlogObject = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(setNotification(`blog ${blog.title} updated`, 5))
  }

  const handleRemoveBlogObject = async (event) => {
    event.preventDefault()

    let choice = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (choice) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`blog ${blog.title} removed`, 5))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{blog.title} {blog.author}</h3>
      <p><a href={blog.url}>{blog.url}</a></p>
      likes {blog.likes} <button id='like-button' onClick={handleUpdateBlogObject}>like</button>
      <div>
        added by {blog.user.name || user.name}
      </div>
      <div>
        {blog.user.name === user.name ? <button id='remove-button' onClick={handleRemoveBlogObject}>remove</button> : null}
      </div>
    </div>
  )
}

export default Blog
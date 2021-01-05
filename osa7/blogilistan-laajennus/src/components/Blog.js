import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import Comment from './Comment'
import { Button } from 'react-bootstrap'

const Blog = () => {

  const dispatch = useDispatch()

  const history = useHistory()

  //get current logged user
  const user = useSelector(state => state.user)

  //get all users
  const users = useSelector(state => state.users)

  //get id
  const id = useParams().id

  //find blog with id
  const blog = useSelector(state => state.blog).find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  //get blog user
  let blogUser = null

  if (blog.user.id) {
    blogUser = users.find(user => user.id === String(blog.user.id))
  } else {
    blogUser = users.find(user => user.id === String(blog.user))
  }

  //get blog comments and blog user
  let comments = []
  if (blog) {
    comments = blog.comments
  }

  const handleUpdateBlogObject = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(setNotification(`blog ${blog.title} updated`, 'success', 5))
  }

  const handleRemoveBlogObject = async (event) => {
    event.preventDefault()

    let choice = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (choice) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`blog ${blog.title} removed`, 'success', 5))
      history.push('/blogs')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      {blog.likes} likes <Button id='like-button' variant='btn btn-outline-primary' type='submit' onClick={handleUpdateBlogObject}>like</Button>
      <div>
        added by {blogUser.name}
      </div>

      <div>
        {blogUser.name === user.name ? <Button id='remove-button' variant='btn btn-outline-dark' type='button' onClick={handleRemoveBlogObject}>remove</Button> : null}
      </div>
      <br />
      <Comment blogId={id} comments={comments} />
    </div>
  )
}

export default Blog

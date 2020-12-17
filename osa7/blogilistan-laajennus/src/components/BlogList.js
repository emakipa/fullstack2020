import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)

  const handleUpdateBlogObject = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`blog ${blog.title} updated`, 5))
  }

  const handleRemoveBlogObject = async (blog) => {

    let choice = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (choice) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`blog ${blog.title} removed`, 5))
    }
  }

  if (!blogs) {
    return null
  }

  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} onClickUpdate={() => handleUpdateBlogObject(blog)} onClickRemove={() => handleRemoveBlogObject(blog)} />
      )}
    </div>
  )
}

export default BlogList
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/index.js'

const Comment = ({ blogId, comments }) => {
  const comment = useField('text')

  const blog = useSelector(state => state.blog.filter(blog => blog.id === blogId))

  const dispatch = useDispatch()

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blogId, comment.input.value))
    dispatch(setNotification(`blog ${blog.title} commented`, 5))
    comment.clear()
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h4>comments</h4>
      <form onSubmit={handleAddComment}>
        <div>
          <input
            id='comment'
            { ...comment.input }
          />
          <button id='addComment-button' type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {comments.map(comment =>
          <li key={comment}>
            {comment}
          </li>)
        }
      </ul>
    </div>
  )
}

export default Comment
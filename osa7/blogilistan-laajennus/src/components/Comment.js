import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/index.js'
import { Form, Button, Row, Col } from 'react-bootstrap'

const Comment = ({ blogId, comments }) => {
  const comment = useField('text')

  const dispatch = useDispatch()

  const blog = useSelector(state => state.blog.find(blog => blog.id === blogId))

  if (!blog) {
    return null
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blogId, comment.input.value))
    dispatch(setNotification(`blog ${blog.title} commented`, 'success', 5))
    comment.clear()
  }

  return (
    <div>
      <h4>comments</h4>
      <div>
        <Form onSubmit={handleAddComment}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  id='comment'
                  { ...comment.input }
                />
              </Col>
              <Col>
                {comment.input.value ?
                  <Button id='addComment-button' variant='primary' type='submit'>
                    add comment
                  </Button> :
                  <Button id='addCommentDisabled-button' variant='primary' type='submit' disabled>
                    add comment
                  </Button>
                }
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
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
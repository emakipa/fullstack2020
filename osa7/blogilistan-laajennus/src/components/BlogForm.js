import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index.js'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreateNewBlogObject = (event) => {
    event.preventDefault()

    createBlog({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    })

    title.clear()
    author.clear()
    url.clear()
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleCreateNewBlogObject}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id='title'
            { ...title.input }
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            id='author'
            { ...author.input }
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            id='url'
            { ...url.input }
          />
          <br />
          <Button id='create-button' variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index.js'

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
      <form onSubmit={handleCreateNewBlogObject}>
        <div>
          title
          <input
            id='title'
            { ...title.input }
          />
        </div>
        <div>
          author
          <input
            id='author'
            { ...author.input }
          />
        </div>
        <div>
          url
          <input
            id='url'
            { ...url.input }
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
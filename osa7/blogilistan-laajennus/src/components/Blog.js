import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({ blog, onClickUpdate, onClickRemove }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = useSelector(state => state.user)

  const [ viewAll, setViewAll ] = useState(false)

  const handleViewAll = () => {
    setViewAll(!viewAll)
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className='blog'>
      {viewAll
        ?
        <div>
          <div>
            {blog.title} {blog.author} <button id='hide-button' onClick={handleViewAll}>{viewAll ? 'hide' : 'view'}</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button id='like-button' onClick={onClickUpdate}>like</button>
          </div>
          <div>
            added by {blog.user.name || user.name}
          </div>
          <div>
            {blog.user.name === user.name ? <button id='remove-button' onClick={onClickRemove}>remove</button> : null}
          </div>
        </div>
        :
        <div>
          {blog.title} {blog.author} <button id='view-button' onClick={handleViewAll}>{viewAll ? 'hide' : 'view'}</button>
        </div>
      }
    </div>
  )
}

export default Blog
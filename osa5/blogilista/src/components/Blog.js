import React, { useState } from 'react'

const Blog = ({ blog, onClickUpdate, onClickRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [ viewAll, setViewAll ] = useState(false)

  const handleViewAll = () => {
    setViewAll(!viewAll)
  }

  return (
    <div style={blogStyle}>
      {viewAll
        ?
        <div>
          <div>
            {blog.title} {blog.author} <button onClick={handleViewAll}>{viewAll ? 'hide' : 'view'}</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes} <button onClick={onClickUpdate}>like</button>
          </div>
          <div>
            {user.name}
          </div>
          <div>
            {blog.user.name === user.name ? <button onClick={onClickRemove}>remove</button> : null}
          </div>
        </div>
        :
        <div>
          {blog.title} {blog.author} <button onClick={handleViewAll}>{viewAll ? 'hide' : 'view'}</button>
        </div>
      }
    </div>
  )
}

export default Blog

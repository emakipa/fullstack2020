import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {

  const blogs = useSelector(state => state.blog)

  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
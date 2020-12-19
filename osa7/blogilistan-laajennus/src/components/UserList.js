import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <td>
            </td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.sort((a, b) => b.blogs.length - a.blogs.length).map(listedUser =>
            <tr key={listedUser.id}>
              <td><Link to={`/users/${listedUser.id}`}>{listedUser.name}</Link></td>
              <td>{listedUser.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
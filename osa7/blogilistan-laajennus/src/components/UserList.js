import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
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
            <User key={listedUser.id} listedUser={listedUser} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
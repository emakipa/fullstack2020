import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { getUsers } from '../reducers/usersReducer'

const UserList = () => {

  const dispatch = useDispatch()

  dispatch(getUsers())

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <b>user</b>
            </td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.sort((a, b) => b.blogs.length - a.blogs.length).map(listedUser =>
            <tr key={listedUser.id}>
              <td>
                <Link to={`/users/${listedUser.id}`}>{listedUser.name}</Link>
              </td>
              <td>
                {listedUser.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
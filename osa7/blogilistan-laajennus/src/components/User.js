import React  from 'react'

const User = ({ listedUser }) => {

  if (!listedUser) {
    return null
  }

  return (
    <tr>
      <td>{listedUser.name}</td>
      <td>{listedUser.blogs.length}</td>
    </tr>
  )
}

export default User
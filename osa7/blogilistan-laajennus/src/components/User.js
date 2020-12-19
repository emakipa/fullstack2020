import React  from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {

  //get all users
  const users = useSelector(state => state.users)

  //get id
  const id = useParams().id

  //find user with id
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <p>added blogs</p>
      <ul>
        {user.blogs.map(blog => <li key={blog.title}> {blog.title} </li>)}
      </ul>
    </div>
  )
}

export default User
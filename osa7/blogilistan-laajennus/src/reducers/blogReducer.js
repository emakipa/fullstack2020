import blogService from '../services/blogs'

//get all blogs
export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  } 
}

//create new blog
export const createNewBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  } 
}

//like blog
export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes += 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  } 
}

//delete blog
export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog.id
    })
  } 
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const likedBlogId = action.data.id
      return state.map(blog =>
        blog.id !== likedBlogId ? blog : action.data 
      )
    case 'DELETE_BLOG':
      const removedBlogId = action.data
      return state.filter((blog) => blog.id !== removedBlogId)    
    default:
      return state
  }
}

export default blogReducer
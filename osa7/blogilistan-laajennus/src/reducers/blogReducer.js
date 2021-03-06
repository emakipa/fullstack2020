import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
export const createNewBlog = (blogObject) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

//like blog
export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes += 1 })
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

//comment blog
export const commentBlog = (blogId, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.comment(blogId, comment)
      dispatch({
        type: 'COMMENT_BLOG',
        data: commentedBlog
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

//delete blog
export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blog.id
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG': {
    const likedBlogId = action.data.id
    const likedBlog = state.find(blog => blog.id === likedBlogId)
    return state.map(blog =>
      blog.id !== likedBlogId ? blog : likedBlog
    )
  }
  case 'COMMENT_BLOG': {
    const commentedBlog = action.data
    return state.map(blog =>
      blog.id !== commentedBlog.id ? blog : commentedBlog
    )
  }
  case 'DELETE_BLOG': {
    const removedBlogId = action.data
    return state.filter((blog) => blog.id !== removedBlogId)
  }
  default:
    return state
  }
}

export default blogReducer
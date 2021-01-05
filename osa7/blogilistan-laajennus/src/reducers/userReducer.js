import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

//login user
export const loginUser = (userObject) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedUser)
      )
      //set token for a logged user
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN_OR_SET_USER',
        data: loggedUser
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

//set user
export const setUser = (loggedUser) => {
  return async dispatch => {
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(loggedUser)
    )
    dispatch({
      type: 'LOGIN_OR_SET_USER',
      data: loggedUser
    })
  }
}

//logout user
export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_OR_SET_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export default userReducer
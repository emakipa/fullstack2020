import userService from '../services/users'

//get all users
export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export default usersReducer

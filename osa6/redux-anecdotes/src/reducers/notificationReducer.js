//set notification
export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      notification: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'NOT_NOTIFY'
      })
    }, time * 1000)
  } 
}

const initialState =  ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.notification
      case 'NOT_NOTIFY':
        return initialState  
    default:
      return state
  }
}

export default notificationReducer
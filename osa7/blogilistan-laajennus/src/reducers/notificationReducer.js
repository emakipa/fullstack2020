var timeOutID

//set notification
export const setNotification = (notification, notificationType, time) => {
  window.clearTimeout(timeOutID)
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        notification,
        notificationType
      }
    })
    timeOutID = window.setTimeout(() => {
      dispatch({
        type: 'NOT_NOTIFY'
      })
    }, time * 1000)
  }
}

const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data
  case 'NOT_NOTIFY':
    return initialState
  default:
    return state
  }
}

export default notificationReducer
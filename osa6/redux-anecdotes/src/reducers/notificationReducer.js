//set notification
export const setNotification = (notification) => {
  return {
    type: 'NOTIFY',
    notification: notification 
  } 
}

//remove notification
export const removeNotification = () => {
  return {
    type: 'NOT_NOTIFY'
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
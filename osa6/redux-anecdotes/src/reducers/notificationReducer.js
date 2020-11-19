//set notification
export const setNotification = (notification) => {
  return {
    type: 'NOTIFY',
    notification
  }
}

const initialState =  'Notification'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer
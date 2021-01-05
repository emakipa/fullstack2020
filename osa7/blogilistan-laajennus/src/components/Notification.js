import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      {!notification ? null :
        <div className={notification.notificationType}>
          {notification.notification}
        </div>
      }
    </div>
  )
}

export default Notification
import React from 'react'

const Person = (props) => {
  const label = 'delete'

  return (
    <div>
      {props.name} {props.number} <button onClick={props.onClick} >{label}</button>
    </div>

  )
}

export default Person
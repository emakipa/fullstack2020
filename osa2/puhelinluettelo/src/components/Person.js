import React from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number} <button onClick={props.onClick} >{props.text}</button>
    </div>

  )
}

export default Person
import React from 'react'

const Button = ({ name, handleClick, text }) => (
    <button value={name} onClick={handleClick}> {text} </button>
  )

export default Button
import React from 'react'
import Input from './Input'

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          <Input text={props.nameText} value={props.nameValue} onChange={props.nameOnChange} />
        </div>
        <div>
          <Input text={props.numberText} value={props.numberValue} onChange={props.numberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
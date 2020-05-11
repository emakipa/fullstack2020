import React from 'react'

const Course = (props) => {
  console.log(props)
  return (
    <div>
      <Header name={props.name} />
      <Content parts={props.parts} />
      <Total exercises={props.parts.map(p => p.exercises)} />
    </div>
  )
}

const Header = ( {name} ) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    const { parts } = props
    
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises} 
      </p>
    )
  }
  
  const Total = ( {exercises} ) => {
    const total = exercises.reduce((returnValue, currentValue) => returnValue + currentValue, 0)
  
    return (
      <div>
        <p>
          <b>total of {total} exercises</b>
        </p>
      </div>
    )
  }

export default Course
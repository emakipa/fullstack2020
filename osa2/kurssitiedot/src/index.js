import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]   

  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} name={course.name} parts={course.parts} />
      )} 
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
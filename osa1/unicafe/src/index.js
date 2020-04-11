import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const sum = (p1, p2, p3) => {
  return p1 + p2 + p3
}

const Statistics = ({ good, neutral, bad }) => {
  if (sum(good, neutral, bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={sum(good, neutral, bad)} />
          <StatisticsLine text="average" value={(good - bad)/sum(good, neutral, bad)} />
          <StatisticsLine text="positive" value={(good/sum(good, neutral, bad)) * 100.0} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
}  

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackHeader = "Give feedback"
  const statisticsHeader = "Statistics"

  // tapahtumakäsittelijät
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header name={feedbackHeader} />
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Header name={statisticsHeader} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

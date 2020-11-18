import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const sum = (p1, p2, p3) => {
  return p1 + p2 + p3
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

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const resetStats = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const feedbackHeader = "Give feedback"
  const statisticsHeader = "Statistics"

  return (
    <div>
      <Header name={feedbackHeader} />
      <Button handleClick={good} text="good" />
      <Button handleClick={ok} text="ok" />
      <Button handleClick={bad} text="bad" />
      <Button handleClick={resetStats} text="reset stats" />
      <Header name={statisticsHeader} />
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

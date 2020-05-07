import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const anecdoteHeader = "Anecdote of the day"
  const mostVotedAnecdoteHeader = "Anecdote with most votes"

  // event handlers:
  // next random anecdote selection
  const nextAnecdote = () => setSelected(Math.floor((Math.random() * anecdotes.length)))
  // voting
  const vote = () => {
    const points = [...votes]
    // add vote to selected anecdote 
    points[selected] += 1
    // index of most voted anecdote
    const index = points.indexOf(Math.max(...points))
    // set votes
    setVotes(points)
    // set index of most voted anecdote
    setMostVoted(index)
  }  

  return (
    <div>
      <Header name={anecdoteHeader} />
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <Header name={mostVotedAnecdoteHeader} />
      <div>
        {props.anecdotes[mostVoted]}
      </div>
      <div>
        has {votes[mostVoted]} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
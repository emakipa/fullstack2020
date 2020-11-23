import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdoteFilter = useSelector(state => state.anecdoteFilter)
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote))
  }

  const notify = (notification) => {
    dispatch(setNotification(notification, 5))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(a => (a.content.toLowerCase().includes(anecdoteFilter.toLowerCase())))
        .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
              voteAnecdote(anecdote)
              notify(`you voted anecdote: '${anecdote.content}'`)
            }
          }
        />
      )}
    </div>  
  )

}

export default AnecdoteList
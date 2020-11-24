import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
              props.vote(anecdote)
              props.setNotification(`you voted anecdote: '${anecdote.content}'`, 5)
            }
          }
        />
      )}
    </div>  
  )
}

const mapStateToProps = (state) => {
  if (state.anecdoteFilter) {
    return {
      anecdotes: state.anecdotes.filter(a => (a.content.toLowerCase().includes(state.anecdoteFilter.toLowerCase())))
    }
  }
  return {
    anecdotes: state.anecdotes
  } 
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
//initialize anecdotes
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_NOTES',
    data: anecdotes,
  }
}

//create anecdote
export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

//vote anecdote
export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_NOTES':
      return action.data   
    case 'NEW_ANECDOTE':
      //add new anedote
      return [...state, action.data]
      //return state.concat(action.data)
    case 'VOTE':
      //find anecdote with desired id
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      //increase votes by one
      const changedAnecdote = { 
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1 
      }
      //return state with votes incresed by one in changedAnecdote
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default: return state
  }
}

export default reducer
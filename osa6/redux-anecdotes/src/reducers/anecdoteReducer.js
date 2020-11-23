import anecdoteService from '../services/anecdotes'

//initialize anecdotes
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    })
  }  
}

//create anecdote
export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.saveNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

//vote anecdote
export const vote = (anecdote) => {
  return async dispatch => {
    //update votes
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({  
      type: 'VOTE',
      data: updatedAnecdote
    })
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
      //anecdote id
      const id = action.data.id
      //return state with votes incresed by one
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data 
      )
    default: return state
  }
}

export default reducer
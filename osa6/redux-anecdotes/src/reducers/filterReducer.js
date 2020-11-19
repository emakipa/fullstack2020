//set filter
export const setFilter = (anecdoteFilter) => {
  return {
    type: 'SET_FILTER',
    anecdoteFilter 
  } 
}

const initialState =  ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.anecdoteFilter
    default:
      return state
  }
}

export default filterReducer
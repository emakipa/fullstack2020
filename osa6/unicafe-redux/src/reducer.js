const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      //copy state, then change good
      return { ...state, good: state.good + 1}
    case 'OK':
      //copy state, then change ok
      return { ...state, ok: state.ok + 1}
    case 'BAD':
      //copy state, then change bad
      return { ...state, bad: state.bad + 1}
    case 'ZERO':
      //reset
      return { good: 0, ok: 0, bad: 0}
    default: return state
  }
  
}

export default counterReducer
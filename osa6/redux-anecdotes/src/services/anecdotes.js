import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//get all anecdotes from server
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

//save creaated anecdote to server
const saveNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { 
  getAll,
  saveNew
 }
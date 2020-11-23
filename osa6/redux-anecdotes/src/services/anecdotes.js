import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//get all anecdotes from server
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

//save created anecdote to server
const saveNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

//update anecdote votes to server
const update = async (updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}

export default { 
  getAll,
  saveNew,
  update
 }
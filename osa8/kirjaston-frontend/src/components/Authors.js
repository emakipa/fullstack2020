import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  ALL_AUTHORS,
  UPDATE_AUTHOR
} from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const [ updateAuthor, result ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        props.setError(error.graphQLErrors[0].message)
      } else {
        props.setError('invalid or missing data')
      }
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({  variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if ( authors.loading ) {
    return <div>loading...</div>
  }

  let authorsByName = authors.data.allAuthors.map(a => a.name)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>set birthyear</h3>
      <div>
        <form onSubmit={submit}>
          <div>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
              <option value="">
              </option>
              {authorsByName.map(a => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
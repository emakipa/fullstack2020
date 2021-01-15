import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const [books, setBooks] = useState(null)

  const genre = props.user.favoriteGenre
  
  const booksByFavoriteGenre = useQuery(ALL_BOOKS, { variables: { genre: genre },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (booksByFavoriteGenre.data) {
      setBooks(booksByFavoriteGenre.data.allBooks)
    }
  }, [booksByFavoriteGenre.data])

  if (!props.show) {
    return null
  }

  if (!books) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <div>
          books in your favorite genre <b>{genre}</b>
      </div>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
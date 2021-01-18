import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [ selectedGenre, setSelectedGenre ] = useState(null)
  // books according to selected genre
  const [books, setBooks] = useState(null)
  // all genres
  const genres = []

  // query for all books
  const booksInLibrary = useQuery(ALL_BOOKS)

  // query for books in selected genre
  const [getBooksByGenre, result] = useLazyQuery(ALL_BOOKS, { variables: { genre: selectedGenre },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (booksInLibrary.data) {
      setBooks(booksInLibrary.data.allBooks)
    }
  }, [booksInLibrary.data])

  if (!props.show) {
    return null
  }

  if ( result.loading ) {
    return <div>loading...</div>
  }

  // all genres in books collection, creating genre list for selection
  booksInLibrary.data.allBooks.forEach(book => {
    book.genres.forEach(genre =>
      genres.includes(genre) ? null : genres.push(genre)
    )
  })

  const handleGenreSelect = async (event) => {
    event.preventDefault()

    if (event.target.value === 'all genres') {
      setSelectedGenre(null)
      return
    }

    setSelectedGenre(event.target.value)

    getBooksByGenre()
  }


  return (
    <div>
      <h2>books</h2>

      {selectedGenre
        ?
        <div>
          in genre <b>{selectedGenre}</b>
        </div>
        :
        <div>
          <b>all genres</b>
        </div>
      }
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

      <h4>select genre</h4>
      <div>
        <button value={'all genres'} onClick={handleGenreSelect}>
          {'all genres'}
        </button>
        {genres.sort().map(g => (
          <button key={g} value={g} onClick={handleGenreSelect}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
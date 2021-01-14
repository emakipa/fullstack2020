import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [ genreSelector, setGenreSelector ] = useState(null)
  const allGenres = []

  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if ( books.loading ) {
    return <div>loading...</div>
  }

  books.data.allBooks.forEach(book => {
    book.genres.forEach(genre =>
      allGenres.includes(genre) ? null : allGenres.push(genre)
    )
  })

  let selectedBooks = []
  if (genreSelector) {
    selectedBooks = books.data.allBooks.filter(book => book.genres.includes(genreSelector))
  } else {
    selectedBooks = books.data.allBooks
  }
  
  const handleGenreSelect = async (event) => {
    event.preventDefault()
    
    if (event.target.value === 'all genres') {
      setGenreSelector(null)
      return
    }

    setGenreSelector(event.target.value)
  }


  return (
    <div>
      <h2>books</h2>

      {genreSelector 
        ?
        <div>
          in genre <b>{genreSelector}</b>
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
          {selectedBooks.map(b =>
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
        {allGenres.sort().map(g => (
          <button key={g} value={g} onClick={handleGenreSelect}>
            {g}
          </button>   
        ))}
      </div>
    </div>
  )
}

export default Books
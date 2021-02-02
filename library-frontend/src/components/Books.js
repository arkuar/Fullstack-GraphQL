import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  const [getBooks, booksQuery] = useLazyQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  useEffect(() => {
    getBooks({ variables: { genre: filter } })
  }, [filter, getBooks])

  useEffect(() => {
    if (booksQuery.data) {
      if (genres.length === 0) {
        setGenres([...new Set(booksQuery.data.allBooks.flatMap(b => b.genres))])
      }
      setBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery, genres])

  const handleClick = (e) => {
    const value = e.target.textContent
    if (value === 'all') {
      setFilter(null)
    } else {
      setFilter(value)
    }
  }

  if (!props.show) {
    return null
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {
        filter
          ? <span>in genre <b>{filter}</b></span>
          : null
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleClick}>all</button>
      {genres.map(g =>
        <button key={g} onClick={handleClick}>{g}</button>
      )}
    </div>
  )
}

export default Books
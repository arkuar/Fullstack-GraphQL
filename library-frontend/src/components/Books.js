import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GENRE_BOOKS } from '../queries'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(null)
  const [genreBooks, setGenreBooks] = useState(null)
  const [getBooks, booksQuery] = useLazyQuery(GENRE_BOOKS, {
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (filter) {
      getBooks({ variables: { genre: filter } })
    } else {
      setGenreBooks(null)
    }
  }, [filter, getBooks])

  useEffect(() => {
    if (booksQuery.data) {
      setGenreBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery])

  const handleClick = (e) => {
    const value = e.target.textContent
    if (value === 'all') {
      setFilter(null)
    } else {
      setFilter(value)
    }
  }

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const genres = [...new Set(books.data.allBooks.flatMap(b => b.genres))]

  const tableRows = (data) => data.map(a =>
    <tr key={a.title}>
      <td>{a.title}</td>
      <td>{a.author.name}</td>
      <td>{a.published}</td>
    </tr>
  )

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
          {tableRows(genreBooks || books.data.allBooks)}
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
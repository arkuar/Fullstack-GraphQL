import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GENRE_BOOKS, USERDATA } from '../queries'

const Recommended = ({ show }) => {
  const result = useQuery(USERDATA)
  const [getFavorites, favoritesQuery] = useLazyQuery(GENRE_BOOKS)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (result.data) {
      getFavorites({ variables: { genre: result.data.me.favoriteGenre } })
    }
  }, [result, getFavorites])

  useEffect(() => {
    if (favoritesQuery.data) {
      setFavorites(favoritesQuery.data.allBooks)
    }
  }, [favoritesQuery])

  if (!show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div>no books in your favorite genre</div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <span>books in your favorite genre <b>{result.data.me.favoriteGenre}</b></span>
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
          {favorites.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
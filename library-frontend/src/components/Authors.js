import React from 'react'
import Birthyear from './Birthyear'

const Authors = ({ show, authors }) => {
  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const authorsData = authors.data.allAuthors

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
          {authorsData.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Birthyear authors={authorsData} />
    </div>
  )
}

export default Authors

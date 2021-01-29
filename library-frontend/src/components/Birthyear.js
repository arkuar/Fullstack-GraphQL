import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
    }
  }
`

const Birthyear = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  const submit = async (e) => {
    e.preventDefault()

    updateAuthor({ variables: { name, setBornTo: +year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a =>
            <option value={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          born
          <input
            value={year}
            type='number'
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Birthyear
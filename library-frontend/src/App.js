
import { useApolloClient, useSubscription, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const Notify = ({ msg }) => {
  if (!msg) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {msg}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()


  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includeIn = (set, obj) => {
      set.map(b => b.id).includes(obj.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includeIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const login = (token) => {
    setToken(token)
    setPage('authors')
  }

  const notify = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000);
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
          authors={authors}
        />

        <Books
          show={page === 'books'}
          books={books}
        />

        <LoginForm
          show={page === 'login'}
          setToken={login}
          setError={notify}
        />
        <Notify msg={errorMsg} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify msg={errorMsg} />

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended
        show={page === 'recommendations'}
      />
    </div>
  )
}

export default App
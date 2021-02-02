import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    title
    published
    genres
    author {
      name
    }
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    genres
    author {
      name
    }
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const USERDATA = gql`
query { 
  me {
    favoriteGenre
  }
}
`
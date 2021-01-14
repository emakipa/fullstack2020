import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) { 
      title
      author {
        name
        born
      }
      published
      genres
      id
    }
  }
`
export const CURRENT_USER = gql`
  query {
    me { 
      username
      favoriteGenre
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN_USER = gql`
  mutation m_loginUser($username: String!, $password: String!){
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }  
`

export const CREATE_USER = gql`
  mutation m_createUser($username:String!, $favoriteGenre: String!){
    createUser(username: $username, favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre
    }
  }
`
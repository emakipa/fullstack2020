import { gql  } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
      author {
      name
      born
    }
    published
    genres
    id
  }
`

const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    favoriteGenre
    id
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const CURRENT_USER = gql`
  query {
    me { 
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`
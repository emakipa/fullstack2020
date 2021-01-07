const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String! 
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }
`

module.exports = { typeDefs }
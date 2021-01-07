const { UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
var { authors, books } = require('./data')

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books
          .filter(book => book.author === args.author)
          .filter(book => book.genres.includes(args.genre))
      }
      if (args.author) {
        return books.filter(book => book.author === args.author)
      }
      if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      } 
      return books 
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root, args) => {
        return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find(book => book.title === args.title)) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      //if author does not exist in authors, author is added
      if (!authors.find(a => a.name === args.author)) {
        authors = authors.concat({ name: args.author, born: null, id: uuid() })
      }  
      return book
    }
  }  
}

module.exports = { resolvers }
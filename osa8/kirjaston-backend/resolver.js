const { authors, books } = require('./data')

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
  }  
}

module.exports = { resolvers }
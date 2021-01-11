const { UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
var { authors, books } = require('./data')
const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')
      
      return books 
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({})

      return authors
    }   
  },
  Author: {
    bookCount: (root, args) => {
        return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      let book = await Book.findOne({ title: args.title })
      if (book) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }

      let author = await Author.findOne({ name: args.author })
      //if author does not exist in authors, author is added
      if (!author) {
        try {
          author = new Author({ name: args.author, born: null });
          await author.save()
        } catch (error) {
          throw new UserInputError('Error in creating new author', {
            invalidArgs: args.author,
          })
        }
      } 

      book = new Book(
        { 
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres 
        }
      )

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError('Error in creating new book', {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...args, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }  
}

module.exports = { resolvers }
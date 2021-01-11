const { UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
var { authors, books } = require('./data')
const Book = require('./models/book')
const Author = require('./models/author')
const { findByIdAndUpdate } = require('./models/book')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book
          .find({ author: { $in: [ author._id ] } })
          .find({ genres: { $in: [ args.genre ] } })
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: [ author._id ] } })
      }
      if (args.genre) {
        return Book.find({ genres: { $in: [ args.genre ] } })
      }

      return await Book.find({}) 
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({})
      return authors
    }   
  },
  Author: {
    bookCount: (root, args) => {
      return Book.find( { author: { $in: [ root.id ] } } ).countDocuments()
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
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        const updateAuthor = {
          name: author.name,
          born: args.setBornTo,
          _id: author.id
        }
        const updatedAuthor = await Author.findByIdAndUpdate(updateAuthor._id, updateAuthor, {new: true}) 
        return updatedAuthor
      } catch (error) {
        throw new UserInputError('Error in updating author', {
          invalidArgs: args
      })
      }
    }
  }  
}

module.exports = { resolvers }

/*
const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...args, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
*/
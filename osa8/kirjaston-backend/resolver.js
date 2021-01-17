const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book
          .find({ author: { $in: [ author._id ] } })
          .find({ genres: { $in: [ args.genre ] } })
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: { $in: [ author._id ] } })
      }
      if (args.genre) {
        return await Book.find({ genres: { $in: [ args.genre ] } })
      }

      return await Book.find({}) 
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({})
      return authors
    },
    me: (root, args, { currentUser }) => {
      return currentUser
    }   
  },
  Author: {
    bookCount: async (root, args) => {
      return await Book.find({ author: { $in: [ root.id ] } }).countDocuments()
    }
  },
  Book: {
    author: async (root, args) => {
      const author = await Author.findOne({ _id: root.author })
      return { 
        name: author.name,
        born: author.born
      }
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('log in to add a book')
      }

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
          if (error.name === 'ValidationError') {
            throw new UserInputError('author name min length is 4', {
              invalidArgs: args.author,
            })
          } else {
            throw new UserInputError(error.message, {
              invalidArgs: args.author,
            })
          } 
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
        if (error.name === 'ValidationError') {
          throw new UserInputError('book title min length is 2', {
            invalidArgs: args,
          })
        } else {
          throw new UserInputError(error.message, {
            invalidArgs: args.author,
          })
        }
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('log in to update author data')
      }

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
        throw new UserInputError(error.message, {
          invalidArgs: args
      })
      }
    },
    createUser: async (root, args) => {
      let user = await User.findOne({ username: args.username })
      if (user) {
        throw new UserInputError('username must be unique', {
          invalidArgs: args.username,
        })
      }

      user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        await user.save()
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new UserInputError('username min length is 3 or data missing', {
            invalidArgs: args,
          })
        } else {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        } 
      }

      return user  
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }  
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },  
}

module.exports = { resolvers }
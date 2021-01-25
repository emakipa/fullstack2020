const DataLoader = require('dataloader')
const Book = require('../models/book')
const collection = require('lodash/collection')

const bookCountLoader = () => {
  return new DataLoader(async (authorIds) => {
    // get all books
    const allBooks = await Book.find({})
    // get all author ids (from book's author field)
    const allAuthorIds = allBooks.map(book => book.author)
    // count occurences for each author ids
    const bookCountsByAuthor = collection.countBy(allAuthorIds)

    // return book counts for given author ids
    return authorIds.map(authorId => bookCountsByAuthor[authorId])
  })
}

module.exports = { bookCountLoader }
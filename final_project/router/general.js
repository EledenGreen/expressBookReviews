const express = require('express')
let books = require('./booksdb.js')
let isValid = require('./auth_users.js').isValid
let users = require('./auth_users.js').users
const public_users = express.Router()

public_users.post('/register', (req, res) => {
  //Write your code here
  return res.status(300).json({ message: 'Yet to be implemented' })
})

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(300).json({ message: 'Books fetched', books })
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn
  const isbnBook = books[isbn]
  return res
    .status(300)
    .json({ message: `Book Found of ISBN: ${isbn}`, isbnBook })
})

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let authorBooks = []
  const authorName = req.params.author

  Object.keys(books).forEach((key) => {
    if (books[key].author === authorName) {
      authorBooks.push(books[key])
    }
  })
  return res
    .status(300)
    .json({ message: `Books for the author ${authorName}`, authorBooks })
})

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: 'Yet to be implemented' })
})

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: 'Yet to be implemented' })
})

module.exports.general = public_users

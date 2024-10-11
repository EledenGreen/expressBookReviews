const express = require('express')
let books = require('./booksdb.js')
let isValid = require('./auth_users.js').isValid
let users = require('./auth_users.js').users
const public_users = express.Router()

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => user.username === username)

  if (userswithsamename.length > 0) {
    return true
  } else {
    return false
  }
}

public_users.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password })
      return res.status(200).json({ message: 'User successfully registered' })
    } else {
      return res.status(404).json({ message: 'User already registered' })
    }
  }

  return res.status(404).json({ message: 'Unable to register' })
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
  let titleBook
  const titleName = req.params.title

  Object.keys(books).forEach((key) => {
    if (books[key].title === titleName) {
      titleBook = books[key]
    }
  })
  return res
    .status(300)
    .json({ message: `Book Title: ${titleName}`, titleBook })
})

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn
  const isbnBookReview = books[isbn].reviews

  return res.status(300).json({
    message: `Review of ${books[isbn].title}: `,
    reviews: isbnBookReview,
  })
})

module.exports.general = public_users

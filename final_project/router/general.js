const express = require('express')
const axios = require('axios')
let isValid = require('./auth_users.js').isValid
let users = require('./auth_users.js').users
const public_users = express.Router()

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  let titleBook
  const titleName = req.params.title

  try {
    const response = await axios.get('http://localhost:3001/books')
    const booksData = response.data

    Object.keys(booksData).forEach((key) => {
      if (booksData[key].title === titleName) {
        titleBook = booksData[key]
      }
    })
    return res
      .status(200)
      .json({ message: `Book Title: ${titleName}`, titleBook })
  } catch (error) {
    return res.status(400).send(error)
  }
})

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  let authorBooks = []
  const authorName = req.params.author

  try {
    const response = await axios.get('http://localhost:3001/books')
    const booksData = response.data

    Object.keys(booksData).forEach((key) => {
      if (booksData[key].author === authorName) {
        authorBooks.push(booksData[key])
      }
    })
    return res
      .status(200)
      .json({ message: `Books for the author ${authorName}`, authorBooks })
  } catch (error) {
    return res.status(400).send(error)
  }
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn

  try {
    const response = await axios.get('http://localhost:3001/books')
    const booksData = response.data
    const isbnBook = booksData[isbn]

    return res
      .status(200)
      .json({ message: `Book Found of ISBN: ${isbn}`, isbnBook })
  } catch (error) {
    return res.status(400).send(error)
  }
})

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:3001/books')
    const booksData = response.data
    return res.status(200).json({ message: 'Books fetched', booksData })
  } catch (error) {
    return res.status(400).send('Error')
  }
})

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn
  const isbnBookReview = books[isbn].reviews

  return res.status(200).json({
    message: `Review of ${books[isbn].title}: `,
    reviews: isbnBookReview,
  })
})

public_users.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password })
      return res.status(200).json({ message: 'User successfully registered' })
    } else {
      return res.status(404).json({ message: 'User already registered' })
    }
  }

  return res.status(404).json({ message: 'Unable to register' })
})

module.exports.general = public_users

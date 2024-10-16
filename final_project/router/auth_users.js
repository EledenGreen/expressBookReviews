const express = require('express')
const jwt = require('jsonwebtoken')
let books = require('./booksdb.js')
const regd_users = express.Router()

let users = []

const isValid = (username) => {
  let userswithsamename = users.filter((user) => user.username === username)

  if (userswithsamename.length > 0) {
    return true
  } else {
    return false
  }
}

const authenticatedUser = (username, password) => {
  let validusers = users.filter(
    (user) => user.username === username && user.password === password
  )
  if (validusers.length > 0) {
    return true
  } else {
    return false
  }
}

//only registered users can login
regd_users.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(404).json({ message: 'Error logging in' })
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      'access',
      { expiresIn: 60 * 60 }
    )
    req.session.authorization = {
      accessToken,
      username,
    }
    return res.status(200).send('User successfully logged in')
  } else {
    return res
      .status(208)
      .json({ message: 'Invalid Login. Check username and password' })
  }
})

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn
  const review = req.query.review
  const username = req.session.authorization.username
  let book = books[isbn]

  if (book) {
    book.reviews[username] = review
    return res.status(200).json({ message: 'review added', book })
  } else {
    return res.status(401).send('not added')
  }
})

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn
  const username = req.session.authorization.username
  let book = books[isbn]

  if (book) {
    if (username in book.reviews) {
      delete book.reviews[username]
      return res.status(200).json({ message: 'review deleted', book })
    } else {
      return res.status(300).send('no review available')
    }
  } else {
    return res.status(404).send('not deleted')
  }
})

module.exports.authenticated = regd_users
module.exports.isValid = isValid
module.exports.users = users

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user. Username or password are missing."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn]
  return res.status(200).send(JSON.stringify(book));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author  = req.params.author
  const filteredBooks = Object.values(books).filter(book => book.author === author);

  if (filteredBooks.length > 0) {
    return res.status(200).send(filteredBooks);  
  } else {
    return res.status(404).send({ message: `No books found for author: ${author}` });
  }});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title  = req.params.title
  const filteredBooks = Object.values(books).filter(book => book.title === title);

  if (filteredBooks.length > 0) {
    return res.status(200).send(filteredBooks);  
  } else {
    return res.status(404).send({ message: `No books found with title: ${title}` });
  }});


public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (book) {
    return res.status(200).send(book.reviews);
  } else {
    return res.status(404).send({ message: `No book found with ISBN: ${isbn}` });
  }
});

module.exports.general = public_users;

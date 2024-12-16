const axios = require('axios');

function getBooksUsingPromise() {
    axios
      .get('http://localhost:4200/')  
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
      });
}

function getBookByISBN(isbn) {
    axios.get(`http://localhost:4200/isbn/${isbn}`)
    .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
      });
}
 

function getBookByAuthor(author) {
    axios.get(`http://localhost:4200/author/${author}`)
    .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
      });
}

function getBookByTitle(title) {
    axios.get(`http://localhost:4200/title/${title}`)
    .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving books:", error);
      });
}


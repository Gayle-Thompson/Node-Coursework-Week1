// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
const port = 3001;

//load the quotes JSON
const quotes = require("./quotes.json");

//START OF YOUR CODE...
app.get("/", function (request, response) {
  response.send("Welcome to Gayle's Quote server, built with Node.js! This project is not responding....");
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/getRandomQuote", function (request, response) {
  response.json(pickFromArray(quotes));
});

app.get("/quotes/search", function (request, response) {
  const quotesQuery = request.query.searchterm;

  function searchMyQuotes(abc) {
    return abc.filter(
      (eachQuote) =>
        eachQuote.quote.toLowerCase().includes(quotesQuery.toLowerCase()) ||
        eachQuote.author.toLowerCase().includes(quotesQuery.toLowerCase())
    );
  }
  response.status(200);
  response.json({
    message: `you searched for: ${quotesQuery}`,
    result: searchMyQuotes(quotes),
  });
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

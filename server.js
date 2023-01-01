// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require("cors");

// To Enable All CORS Requests
app.use(cors());

//body-parser To allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require("body-parser");

// for parse applications so we can deal with any form of elements if there are any such as XML 
app.use(bodyParser.urlencoded({ extended: false }));

// for parse application/json for dealing with json data
app.use(bodyParser.json());

// To Initialize the main project folder which containg index , html and css files and the client 
app.use(express.static("website"));

// Setup empty JS object or array to act as endpoint for all routes for collecting and storing all recieved data for reusing as posting or sending it later
projectData = {};

// to ste port no for routing ie geting and posting data
const port = 3000;


// Router Get To GET all data through '/GetAllData' from client app through http://localhost:3000/GetAllData
const GetingAll = (Request, response) => {response.status(200).send(projectData)};
// To complete GET Route
app.get("/All", GetingAll);


// Router Post To complete Post '/PostAllData' to client app through http://localhost:3000/PostAllData path from the server

const SendingInfo = (requset, response) => {
    projectData = {temp:requset.body.temp, date:requset.body.date , content:requset.body.content};
   
    response.status(200).send(projectData);
  }

// to complete GETPost Route
app.post("/Add", SendingInfo);


// creating a function to test the server 
function listening() {
console.log(`Server running on http://localhost:${port}`);
}

// seting up the server by 'node server.js'
app.listen(port, listening);


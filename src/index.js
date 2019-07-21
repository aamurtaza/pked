const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv/config");
const uuidv4 = require("uuid/v4");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

// Add CORS middleware in application
// FOR dev let all domains all routes, when deploy add 'whilelist'
// https://expressjs.com/en/resources/middleware/cors.html
app.use( cors() );

// Add body_parser middleware to accessing the payload of incomming requests.
// Extracted payload get expose in request body object
app.use ( bodyParser.json() );
app.use ( bodyParser.urlencoded({ extended: true }));

// define the resolve handler for the default home page
// try different HTTP methods with same URI '/' which acts as resource
app.get( "/", ( req, res ) => {
    return res.send( `Received a GET HTTP method request.` );
});

app.post( "/", ( req, res )  => {
    return res.send( `Received a POST HTTP method request.` );
});

app.put( "/", (req, res) => {
    return res.send( `Received a PUT HTTP method request.` );
});

app.delete( "/", (req, res) => {
    return res.send( `Received a DELETE HTTP method request.` );
});

// let's try to consume APIs by sending some data
let users = {
    1: {
        id: 1,
        username: "User A",
    },
    2: {
        id: 2,
        username: "User B",
    },
};

let messages = {
    1: {
        id: 1,
        text: "Text A",
        userId: 1,
    },
    2: {
        id: 2,
        text: "Text B",
        userId: 2,
    },
};

// USERS
// add '/user' resouce or endpoint 
app.get( "/users", ( req, res ) => {
    // return res.json( `Received a GET users request.` );
    return res.send( Object.values(users) );
});

// GET single user by userId parameter in URI
app.get( "/users/:userId", (req, res) => {
    return res.send( users[req.params.userId] );
});

// POST to create new user
app.post( "/users", ( req, res )  => {
    // return res.send( `Received a POST users request.` );
    // use helper lib uuid to get unique id 
    const id = uuidv4();
    let user = {
        id,
        user: req.body.username,
    }
    // add to our pseudo database
    users[id] = user;
    return res.send(user);
});

// assign parameters in URI, callback func holds it in request object
app.put( "/users/:userId", (req, res) => {
    return res.send( `Received a PUT request for userId:${req.params.userId}.` );
});

// assign parameters in URI, callback func holds it in request object
app.delete( "/users/:userId", (req, res) => {
    return res.send( `Received a DELETE request for userId:${req.params.userId}.` );
});

// MESSAGES
// add '/messages' resource or endpoint
app.get( "/messages", (req, res) => {
    res.send( Object.values(messages) );
});

// GET messages by messageId
app.get( "/messages/:messageId", (req, res) => {
    res.send( messages[req.params.messageId] );
});

// POST to create new message
app.post( "/messages", (req, res) => {
    // user helper lib to get unique id
    const id = uuidv4();
    let message = {
        id,
        text: req.body.text,
        userId: req.body.userId,
    }
    // add to our pseudo database
    messages[id] = message;
    return res.send(message);
});

// start the express server
app.listen( port, () => {
    console.log( `CORS enabled server started at http//localhost:${ port }` )
} );
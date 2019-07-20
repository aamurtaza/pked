const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv/config");

const app = express();
const port = process.env.PORT || 8000;

// Add CORS middleware in application
// FOR dev let all domains all routes, when deploy add 'whilelist'
// https://expressjs.com/en/resources/middleware/cors.html
app.use( cors() );

// define the resolve handler for the default home page
// try different HTTP methods with same URI '/' which acts as resource
app.get( "/", ( req, res ) => {
    return res.send( `Recieved a GET HTTP method request.` );
});

app.post( "/", ( req, res )  => {
    return res.send( `Recieved a POST HTTP method request.` );
});

app.put( "/", (req, res) => {
    return res.send( `Recieved a PUT HTTP method request.` );
});

app.delete( "/", (req, res) => {
    return res.send( `Recieved a DELETE HTTP method request.` );
});

// add '/user' resouce or endpoint 
app.get( "/users", ( req, res ) => {
    return res.send( `Recieved a GET users request.` );
});

app.post( "/users", ( req, res )  => {
    return res.send( `Recieved a POST users request.` );
});

// assign parameters in URI, callback func holds it in request object
app.put( "/users/:userId", (req, res) => {
    return res.send( `Recieved a PUT request for userId:${req.params.userId}.` );
});

// assign parameters in URI, callback func holds it in request object
app.delete( "/users/:userId", (req, res) => {
    return res.send( `Recieved a DELETE request for userId:${req.params.userId}.` );
});

// start the express server
app.listen( port, () => {
    console.log( `CORS enabled server started at http//localhost:${ port }` )
} );
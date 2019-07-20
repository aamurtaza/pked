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
app.get( "/", async ( req, res ) => {
    return res.send( JSON.stringify( "Welcome to Pked." ) );
} );

// start the express server
app.listen( port, () => {
    console.log( `CORS enabled server started at http//localhost:${ port }` )
} );
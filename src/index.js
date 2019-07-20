import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Initialize environment variables
dotenv.config()

const app = express();
const port = process.env.PORT;

// Add CORS middleware in application
// FOR dev let all domains all routes, when deploy add 'whilelist'
app.use( cors() );

// define the resolve handler for the default home page
app.get( "/", async ( req, res ) => {
    return res.send( JSON.stringify( "Welcome to Pked." ) );
} );

// start the express server
app.listen( port, () => {
    console.log( `server started at http//localhost:${ port }` )
} );
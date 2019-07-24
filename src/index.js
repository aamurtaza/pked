import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models from '../models';
import routes from '../routes';

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

// Add custom middle to implement psuedo - user authentication 
// this intercept each request to determine if its authenticated or not.
// this clarifies the flow of creating by userId
app.use ( (req, res, next) => {
    // assuming users[1] is now as "authenticated user" sent from client.
    req.context = {
        models,
        me: models.users[1],
    };
    // callback to inform when job is finished
    // important when middleware uses asynchronous functions
    next();
});

// mount the router modules on the app
app.use ('/', routes.session);
app.use ( '/', routes.users );
app.use ( '/', routes.messages );

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

// start the express server
app.listen( port, () => {
    console.log( `CORS enabled server started at http//localhost:${ port }` )
} );
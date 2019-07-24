import { Router } from "express";
import uuidv4 from 'uuid/v4';

const router = Router();

// USERS
// add '/user' resouce or endpoint 
router.get( "/users", ( req, res ) => {
    // return res.json( `Received a GET users request.` );
    return res.send( Object.values(req.context.models.users) );
});

// GET single user by userId parameter in URI
router.get( "/users/:userId", (req, res) => {
    return res.send( req.context.models.users[req.params.userId] );
});

// POST to create new user
router.post( "/users", ( req, res )  => {
    // return res.send( `Received a POST users request.` );
    // use helper lib uuid to get unique id 
    const id = uuidv4();
    let user = {
        id,
        user: req.body.username,
    }
    // add to our pseudo database
    req.context.models.users[id] = user;
    return res.send(user);
});

// assign parameters in URI, callback func holds it in request object
router.put( "/users/:userId", (req, res) => {
    return res.send( `Received a PUT request for userId:${req.params.userId}.` );
});

// assign parameters in URI, callback func holds it in request object
router.delete( "/users/:userId", (req, res) => {
    return res.send( `Received a DELETE request for userId:${req.params.userId}.` );
});

export default router;
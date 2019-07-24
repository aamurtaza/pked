import { Router } from "express";
import uuidv4 from 'uuid/v4';

const router = Router();

// MESSAGES
// add '/messages' resource or endpoint
router.get( "/messages", (req, res) => {
    res.send( Object.values(req.context.models.messages) );
});

// GET messages by messageId
router.get( "/messages/:messageId", (req, res) => {
    res.send( req.context.models.messages[req.params.messageId] );
});

// POST to create new message
router.post( "/messages", (req, res) => {
    // user helper lib to get unique id
    const id = uuidv4();
    let message = {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    }
    // add to our pseudo database
    req.context.models.messages[id] = message;
    return res.send(message);
});

// DELETE message by messageId
router.delete( "/messages/:messageId", (req, res) => {
    // 'spread syntax' / three dots '...' are used to expand messages object
    // https://code4developers.com/spread-syntax-in-javascript/ 
    // the first line extract message by req.params.messageId
    // where ...OtherMessages is a new object which will carry all other messages
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } =  req.context.models.messages;

    // assigning otherMessages to messages to simulate DELETE request.
    req.context.models.messages = otherMessages;
    return res.send(message);
});

export default router;
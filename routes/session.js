import { Router } from "express";

const router = Router();

// Dedicate '/session' route to authenticated user
router.get( "/session", (req, res) => {
    // returns the authenticated user.
    return res.send(req.context.models.users[req.context.me.id] );
});

export default router;
import express from 'express';          //importing Express.js framework to uses route
import { test, updateUser } from '../controllers/user.controller.js'; // Import controller functions
import { verifyToken } from '../utils/verifyUser.js';  // Import middleware for token verification

const router = express.Router();        //creating a router instance

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);     // Define a route for updating user information,// This route requires token verification middleware (verifyToken) before calling the updateUser controller function


export default router;          // to use this model anywhere else in our application
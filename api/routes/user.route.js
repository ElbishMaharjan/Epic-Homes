import express from 'express';          //importing Express.js framework to uses route
import { deleteUser, test, updateUser } from '../controllers/user.controller.js'; // Import controller functions
import { verifyToken } from '../utils/verifyUser.js';  // Import middleware for token verification

const router = express.Router();        //creating a router instance

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);     // Define a route for updating user information,// This route requires token verification middleware (verifyToken) before calling the updateUser controller function
router.delete('/delete/:id', verifyToken, deleteUser);     // Define a route to handle user deletion // This route will be accessible at /delete/:id and will use the deleteUser function to handle the deletion // It requires authentication using the verifyToken middleware to ensure the user is authenticated before deletion

export default router;          // to use this model anywhere else in our application
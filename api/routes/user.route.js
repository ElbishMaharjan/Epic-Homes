import express from 'express';          //importing Express.js framework to uses route
import { deleteUser, test, updateUser, getUserListings } from '../controllers/user.controller.js'; // Import controller functions
import { verifyToken } from '../utils/verifyUser.js';  // Import middleware for token verification

const router = express.Router();        //creating a router instance

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);     // Define a route for updating user information,// This route requires token verification middleware (verifyToken) before calling the updateUser controller function
router.delete('/delete/:id', verifyToken, deleteUser);     // Define a route to handle user deletion // This route will be accessible at /delete/:id and will use the deleteUser function to handle the deletion // It requires authentication using the verifyToken middleware to ensure the user is authenticated before deletion
router.get('/listings/:id', verifyToken, getUserListings); // Define a route to handle GET requests for retrieving listings by I This route expects a dynamic parameter ':id' in the URL path, representing the unique identifier of the listing Before processing the request, the 'verifyToken' middleware is invoked to ensure authentication and validate the user's access token.If the token verification is successful, the control is passed to the 'getUserListings' handler function. This function is responsible for fetching and returning the details of the listing associated with the provided ID.


export default router;          // to use this model anywhere else in our application
import express from 'express';                                        // Import the Express framework
import { createListing } from '../controllers/listing.controller.js'; // Import the createListing function from the listing.controller module
import { verifyToken } from '../utils/verifyUser.js';                 // Import the verifyToken function from the verifyUser module

const router = express.Router();                      // Create a router instance using Express

router.post('/create', verifyToken, createListing);   // Define a route for creating a new listing , This route handles POST requests to /create endpoint, The verifyToken middleware is used to verify the user's token before allowing access, The createListing function from the controller is invoked when the route is accessed

export default router;                                // Export the router instance to be used in other modules
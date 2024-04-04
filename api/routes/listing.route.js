import express from 'express';                                        // Import the Express framework
import { createListing, deleteListing, updateListing, getListing } from '../controllers/listing.controller.js'; // Import the createListing function from the listing.controller module
import { verifyToken } from '../utils/verifyUser.js';                 // Import the verifyToken function from the verifyUser module

const router = express.Router();                      // Create a router instance using Express

router.post('/create', verifyToken, createListing);   // Define a route for creating a new listing , This route handles POST requests to /create endpoint, The verifyToken middleware is used to verify the user's token before allowing access, The createListing function from the controller is invoked when the route is accessed
router.delete('/delete/:id', verifyToken, deleteListing); // Define a route for handling DELETE requests to delete a listing by ID,This route expects a dynamic parameter ':id' in the URL path, representing the unique identifier of the listing to be deleted,The 'verifyToken' middleware is used to authenticate the request and ensure the user has permission to delete the listing, Upon successful authentication, the 'deleteListing' controller function is called to handle the deletion process
router.post('/update/:id', verifyToken, updateListing);  // Define a route for handling POST requests to update a listing by ID,This route expects a dynamic parameter ':id' in the URL path, representing the unique identifier of the listing to be updated,The 'verifyToken' middleware is used to authenticate the request and ensure the user has permission to update the listing,Upon successful authentication, the 'updateListing' controller function is called to handle the updating process
router.get('/get/:id', getListing);                    // Define a route for handling GET requests to retrieve a listing by ID, This route expects a dynamic parameter ':id' in the URL path, representing the unique identifier of the listing, When this route is matched, it calls the 'getListing' controller function to retrieve the listing details



export default router;                                // Export the router instance to be used in other modules
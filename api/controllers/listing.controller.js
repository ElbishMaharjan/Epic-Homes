import Listing from "../models/listing.model.js";       // Import the Listing model for database operations
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {   // Define an asynchronous function to handle the creation of a new listing
   try {
    const listing = await Listing.create(req.body);        // Create a new listing using the data from the request body
    return res.status(201).json(listing);                  // Send a JSON response with the created listing and status code 201 (Created)
   } catch (error) {
    next(error);                                      // If an error occurs, pass it to the error-handling middleware
   } 
};

// Controller function to handle the deletion of a listing
export const deleteListing = async (req, res, next) => {  
   const listing = await Listing.findById(req.params.id);   //Checking if the listing exists or not, from our lsiting model by using findebyID,  This function retrieves the listing to be deleted by its ID from the database
   
   if (!listing) {    // If the listing does not exist, invoke an error handler with status code 404
      return next(errorHandler(404, 'Listing not found!'));
   }
   
   if (req.user.id !== listing.userRef) {        // If the authenticated user ID does not match the user ID associated with the listing, invoke an error handler with status code 401, checking if user is owner of the listing or not
      return next(errorHandler(401, 'you can only delete your own listings!'));
   }

   try {
      await Listing.findByIdAndDelete(req.params.id);  // If authentication and validation are successful, delete the listing from the database
      res.status(200).json('Listing has been deleted!');  // Send a success message in the response with status code 200
   } catch (error) {
      next(error);           // If an error occurs during the deletion process, pass it to the error handling middleware
   }
};
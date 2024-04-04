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
   const listing = await Listing.findById(req.params.id);   //Checking if the listing exists or not, from our lisiting model by using findebyID,  This function retrieves the listing to be deleted by its ID from the database
   
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

// Controller function to handle the updating of a listing
export const updateListing = async (req, res, next) => {
   const listing = await Listing.findById(req.params.id);  //Retrieve the listing to be updated by its ID from the database
   if (!listing) {    // If the listing does not exist, invoke an error handler with status code 404
      return next(errorHandler(404, 'Listing not found!'));
   }
   
   if (req.user.id !== listing.userRef) {        // If the authenticated user ID does not match the user ID associated with the listing, invoke an error handler with status code 401, checking if user is owner of the listing or not
      return next(errorHandler(401, 'you can only update your own listings!'));
   }
   try {     // Update the listing with the provided data using the 'findByIdAndUpdate' method
     const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,      // 1. The ID of the listing to be updated (req.params.id)
      req.body,           // 2. The new data to be applied to the listing (req.body)
      {new: true}         // 3. An options object specifying that the updated document should be returned (new: true)
   );
      res.status(200).json(updatedListing);  // Send a success message in the response with status code 200
   } catch (error) {
      next(error);           // If an error occurs during the deletion process, pass it to the error handling middleware
   }
};


// Controller function to handle the retrieval of a listing by ID
export const getListing = async (req, res, next) => {
try{
   const lisiting = await Listing.findById(req.params.id);  // Retrieve the listing from the database based on the provided ID
   if (!lisiting){  // If the listing does not exist, invoke an error handler with status code 404
       return next(errorHandler(404, "Listing not found"));
   }
   res.status(200).json(lisiting);   // Send the listing data in the response with status code 200  // The listing data is sent as a JSON object in the response body
}catch(error){
   next(error);   // If an error occurs during the retrieval process, pass it to the error handling middleware
}
};
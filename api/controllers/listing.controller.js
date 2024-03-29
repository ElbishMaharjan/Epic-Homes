import Listing from "../models/listing.model.js";       // Import the Listing model for database operations

export const createListing = async (req, res, next) => {   // Define an asynchronous function to handle the creation of a new listing
   try {
    const listing = await Listing.create(req.body);        // Create a new listing using the data from the request body
    return res.status(201).json(listing);                  // Send a JSON response with the created listing and status code 201 (Created)
   } catch (error) {
    next(error);                                      // If an error occurs, pass it to the error-handling middleware
   } 
};
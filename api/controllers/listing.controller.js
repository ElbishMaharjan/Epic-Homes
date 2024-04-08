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
   const listing = await Listing.findById(req.params.id);         //Checking if the listing exists or not, from our lisiting model by using findebyID,  This function retrieves the listing to be deleted by its ID from the database
   
   if (!listing) {                                         // If the listing does not exist, invoke an error handler with status code 404
      return next(errorHandler(404, 'Listing not found!'));
   }
   
   if (req.user.id !== listing.userRef) {                                     // If the authenticated user ID does not match the user ID associated with the listing, invoke an error handler with status code 401, checking if user is owner of the listing or not
      return next(errorHandler(401, 'you can only delete your own listings!'));
   }

   try {
      await Listing.findByIdAndDelete(req.params.id);            // If authentication and validation are successful, delete the listing from the database
      res.status(200).json('Listing has been deleted!');        // Send a success message in the response with status code 200
   } catch (error) {
      next(error);                                               // If an error occurs during the deletion process, pass it to the error handling middleware
   }
};

// Controller function to handle the updating of a listing
export const updateListing = async (req, res, next) => {
   const listing = await Listing.findById(req.params.id);          //Retrieve the listing to be updated by its ID from the database
   if (!listing) {                                          // If the listing does not exist, invoke an error handler with status code 404
      return next(errorHandler(404, 'Listing not found!'));
   }
   
   if (req.user.id !== listing.userRef) {                  // If the authenticated user ID does not match the user ID associated with the listing, invoke an error handler with status code 401, checking if user is owner of the listing or not
      return next(errorHandler(401, 'you can only update your own listings!'));
   }
   try {                                             // Update the listing with the provided data using the 'findByIdAndUpdate' method
     const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,              // 1. The ID of the listing to be updated (req.params.id)
      req.body,                   // 2. The new data to be applied to the listing (req.body)
      {new: true}                // 3. An options object specifying that the updated document should be returned (new: true)
   );
      res.status(200).json(updatedListing);     // Send a success message in the response with status code 200
   } catch (error) {
      next(error);                           // If an error occurs during the deletion process, pass it to the error handling middleware
   }
};


// Controller function to handle the retrieval of a listing by ID
export const getListing = async (req, res, next) => {
try{
   const lisiting = await Listing.findById(req.params.id);    // Retrieve the listing from the database based on the provided ID
   if (!lisiting){                                            // If the listing does not exist, invoke an error handler with status code 404
       return next(errorHandler(404, "Listing not found"));
   }
   res.status(200).json(lisiting);             // Send the listing data in the response with status code 200  // The listing data is sent as a JSON object in the response body
}catch(error){
   next(error);                             // If an error occurs during the retrieval process, pass it to the error handling middleware
}
};

export const getListings = async (req, res, next) => {                      //  creating getlisting Asynchronous function to handle fetching listings data
   try{
      const limit = parseInt(req.query.limit) || 9;                             //Making pagination or making page limit, we wanna have a limit which is going to be parseInt (converts a string to an intege), if we have a request inside our API request we can add limit,and we can have a query,and if there is no query, we want to set it to be 9,in simple, if there is limit, use it,parse it and make a number.Otherwise, use 9 because we want to limit to 9// Set the limit of listings to display per request. Defaults to 9 if not specified.
      const startIndex = parseInt(req.query.startIndex) || 0;                     // Determine the starting index for fetching listings. Defaults to 0 if not specified,if there is no start index set it to 0
      
      let offer = req.query.offer;                               // creating a variable offer
      if (offer === undefined || offer === 'false'){             // offer can be true,false or undefined,because if we dont write down, offer is going to be undefined. it can be anythig thats  why checking if offer is undefined,or offer is false.
      offer = {$in:  [true, false]};                           //$in search inside the database,both true and false, it can be true and false,because we are not defined the offer, we want both of them, we want the listing, which can be offered or not, because we are not defining anything, we dont say it false, because the user wants to see every listing by default. but if user choose the offer, user just want to see the offers.So if there is no offer selected,we need to search both of the offers and not offers
      }

      let furnished = req.query.furnished;                        //we want to get it from query
      if ( furnished === undefined ||  furnished ==='false'){    // if the furnished is undefined or false,  search inside the furnished, noth the true and false
         furnished = {$in:  [true, false]};
      }

      let parking = req.query.parking;
      if ( parking === undefined ||  parking ==='false'){
         parking = {$in:  [true, false]};
      }

      let type = req.query.type;
      if ( type === undefined ||  type ==='all'){               // if type is undefined or all, all is both rent and sale selected, (which is selected by default), in this case we want to search the type to be both rent and sale, if there is no type or the type is all search both sale and rent
         type = {$in:  ['sale', 'rent']};
      }

      const searchTerm = req.query.searchTerm || '';               //we get seach term from query as well, if there is no search,just an empty string.So search fo nothing// fetch the 'searchTerm' query parameter from the request. If not provided, default to an empty string

      const sort = req.query.sort || 'createdAt';                //sort is going from query or going to be createdAt because we want to sort it by latest/ Retrieve the 'sort' query parameter from the request. If not provided, default to 'createdAt'

      const order  = req.query.order || 'desc';               //order in descending which is default behaviour// Retrieve the 'order' query parameter from the request. If not provided, default to 'desc'

      // Fetch listings from the database based on search criteria.
      const  listings = await Listing.find({                        // we want to get the listing wait and use our listing model
         name: { $regex: searchTerm, $options: 'i' },               // Search for listings with names that match the searchTerm  // regex means searching everywhere  it can search some small word and as well as full word which is built in search functionnality for MongoDB, and options: i means dont care about the lowercase and uppercase
         offer,                                                     //search for offer,..
         furnished,
         parking,
         type, 
      })
      .sort({[sort]: order })                       // we want to sort it based on the createdAt, and descending(specified sort field and order)
      .limit(limit)                                 // Limit the number of listings returned per request    // limit the limit from above 
      .skip(startIndex);                            // Skip the specified number of listings to implement pagination,/skip the start index. if the start index is zero, they are going to start from the beginning, but if it is 1 this is going to skip the first 9 because we want to limit it to 9 by default 

      return res.status(200).json(listings);      // we want to return to the user with fetched listings as JSON response with a success status code

   } catch (error) {
      next (error);                                // If an error occurs during the fetching process, pass it to the error handling middleware
   }
}
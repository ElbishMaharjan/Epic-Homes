import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

// Controller function for testing
export const test = (req, res)=> {
    res.json({                         
        message: 'Hello world',        
    });
};
// Controller function for updating user information
export const updateUser = async(req, res, next) =>{
     // Check if the authenticated user is updating their own account
    if(req.user.id !== req.params.id) return next (errorHandler(401, "You can only update your own account!")) // If the IDs don't match, return an error indicating that the user can only update your own account
    try{
        // Hash the password if provided in the request body
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10) //no.of salt
        }
        // Update the user information in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{   //findByIdAndUpdate = METHOD
            $set:{                   //for.eg=the user might chnage its username,but doesn't want to change its email and password.so its not always the data is completed.So we need to actually use a method called SET to do it.So set is going to check if the data is being changed or is going to change otherwise it is going to ignore the data 
                username: req.body.username,  //user can change username
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, {new: true});  //it is going to actually return and save this updated user for the with the new information, not the previous one. if we dont add this code we will get previous information

        const {password, ...rest} = updatedUser._doc;  // Exclude the password field from the response

        res.status(200).json(rest);   // Send the updated user information in the response

    } catch (error) {
        next(error)   // Forward errors to the error handling middleware
    }
};

// Export deleteUser function to handle user deletion
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id)  // Check if the authenticated user ID matches the ID in the request parameters
    return next(errorHandler(401, 'You can only delete your own account!'))  // If the IDs don't match, return an error indicating that the user can only delete their own account
    try{
        await User.findByIdAndDelete(req.params.id) ;     // Attempt to find and delete the user by ID
        res.clearCookie('access_token');                   // Clear the access_token cookie to log the user out
        res.status(200).json('User has been deleted!');    // Respond with a success message
    } catch (error) {
        next(error)                              // If an error occurs, pass it to the error-handling middleware
}
};


export  const getUserListings = async (req, res, next) => {
    if(req.user.id  === req.params.id){   // Check if the authenticated user ID matches the requested user ID
        try {
            const listings = await Listing.find({ userRef: req.params.id});   // Fetch listings associated with the user ID from the database
            res.status(200).json(listings);  // Send a JSON response with the listings and a status code of 200
        }  catch (error) {
            next(error)   // If an error occurs during database operation, pass it to the error handling middleware
        }                   
}else{
    return next(errorHandler(401, 'you can only view your own listings!'));// If the authenticated user ID does not match the requested user ID, invoke an error handler with status code 401, indicating unauthorized access
    }
};

// Define an asynchronous function 'getUser' to handle fetching user data by ID
export const getUser = async  (req, res, next) => {
    try{
        const user = await User.findById(req.params.id) ;      // Find the user by their ID
        if(!user) return next(errorHandler(404, 'User not found'));  // If user not found, return 404 error
        const { password: pass, ...rest } = user._doc;         // Destructure password field from user document,otherwise we want to bring back the user, but we dont want to bring the password. so seperating the password with name pass with the rest which is inside the user._doc
        res.status(200).json(rest);            // Send the user data in the response       
    } catch (error) {
        next(error);        // Forward any errors to the error handling middleware
    }
};
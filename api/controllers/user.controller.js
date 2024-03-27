import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// Controller function for testing
export const test = (req, res)=> {
    res.json({                         
        message: 'Hello world',        
    });
};
// Controller function for updating user information
export const updateUser = async(req, res, next) =>{
     // Check if the authenticated user is updating their own account
    if(req.user.id !== req.params.id) return next (errorHandler(401, "You can only update your own account!"))
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
}
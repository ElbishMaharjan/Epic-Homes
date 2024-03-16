import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';           //for using hashed password

export const signup = async(req, res) =>{      // creating a function inside a controller
 const { username, email, password } = req.body;    //after requesting or getting password we goona hashed
 const hashedPassword = bcryptjs.hashSync(password, 10);   //hashsync is similiar to await and (10 - salting our hash, it dictate how many round or times we perform the hashing process.
 const newUser = new User({ username, email, password: hashedPassword });      //Saving in a database by creating newUser with the help of user model
    try{
        await newUser.save()            // if we only use save it may take time depending upon internet and, 
                                   // in order to prevent error we use await( = async function) so the quote is going to stay in this line until this save operation finish.
    res.status(201).json('User created successfully!');   // creating a response with status 201 also with message

    } catch (error){
        res.status(500).json(error.message);
    }
};
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';           //for using hashed password
import { errorHandler } from "../utils/error.js"; //to handleerror 
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) =>{      // creating a function inside a controller
 const { username, email, password } = req.body;    //after requesting or getting password we goona hashed
 const hashedPassword = bcryptjs.hashSync(password, 10);   //hashsync is similiar to await and (10 - salting our hash, it dictate how many round or times we perform the hashing process.
 const newUser = new User({ username, email, password: hashedPassword });      //Saving in a database by creating newUser with the help of user model
    try{
        await newUser.save()            // if we only use save it may take time depending upon internet and, 
                                   // in order to prevent error we use await( = async function) so the quote is going to stay in this line until this save operation finish.
    res.status(201).json('User created successfully!');   // creating a response with status 201 also with message

    } catch (error){
        next(error);
    }
};

export const signin = async(req, res, next) =>{           // creating a function inside a controller & use middleware
    const { email, password } = req.body;     //get the data from req.body i.e email & password or usernam,password can also be used
    try{
        const validUser = await User.findOne({ email}); // to search the email inside moongose we use (findOne) method from the USER model.js and  use await beacuse it takes time to check in DB, email is stored in validUser
        if (!validUser) return next(errorHandler(404, 'User not found!'));  //  if email is not correct, then return  an error using (next middleware) which we created costumized error.js with named errorhandler 
        const validPassword = bcryptjs.compareSync(password, validUser.password); // password from req.body is not hased password & to compared with DB password use pakage bcrypt.js and its method comparesync(password from req.body, and from user we get validUser.password )
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));
        // if we r sure that both email and password r correct we need to authenticate the user, for authenticate cookie is added inside the browser and we need to create hased token that includes the email of user,or the id, and save this token inside the browser cookie so each time user want to do something, like change email,password,so it is important to check they are authenticated or not. and we r going to hash that data as well, to hash JWT or JSON WEB TOKEN pakage is used,use this pakage to crete the token
        const token = jwt.sign({id: validUser._id }, process.env.JWT_SECRET) //creating token and use method from JWT which is sign and add information that is unique for the user, it can be username,email or id. In mongo db ID is created automatically and unique for our database, so from that id we can later authenticate the user, also we wanna add some secret key which is unique for our application it can be any number or alpabet. it is saved in enviromental variable.
        const { password: pass, ...rest } = validUser._doc; // removing password or not sending password to user, destructure the password and the rest of the user info || no worried about password to be leaked to the user
        res
        .cookie ('access_token', token, { httpOnly: true}) //after creating token to save this token as cookie using (res.cookie), gave name as "access_token", and passing above token, save that token inside cookie. adding other information like httponly:true which means no other third party applications can have access to our cookie,and make cookie safer, so now we have cookie inside brower
        .status(200)   //return ststus200
        .json(rest);   //return rest except password
    } catch (error){
        next(error);   //using middleware from index.js to catch the error
    }

}
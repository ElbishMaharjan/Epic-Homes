import jwt from "jsonwebtoken";   // Import the jsonwebtoken library
import { errorHandler } from './error.js';    // Import the errorHandler function from the error.js file
// Middleware function to verify JWT authentication tokens
export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;      // Extract the JWT token from the 'access_token' cookie,//to  get any data from cookie we need to install packaged called cookie-parser. 

    if (!token) return next(errorHandler(401, 'Unauthorized'));// If token is not present in the request cookies, return an error

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {   // Verify the JWT token using the secret key
        if (err) return next(errorHandler(403,'Forbidden'));     // If an error occurs during token verification, return a forbidden error

        req.user = user;   // If token is successfully verified, attach the user information to the request object
        next();              // Call the next middleware in the chain
    });
};




//  The code defines a middleware function named 'verifyToken' to verify JWT authentication tokens attached to incoming requests.
// If the token is valid, it attaches the decoded user information to the request object and calls the next middleware.
// If the token is missing or invalid, it returns an appropriate error response.
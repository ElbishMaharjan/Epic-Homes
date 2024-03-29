import express from 'express';    // Import Express.js framework
import mongoose from 'mongoose';  // Import mongoose for MongoDB interactions
import dotenv from 'dotenv';      // Import dotenv for environment variables
import userRouter from './routes/user.route.js';     // Import user routes
import authRouter from './routes/auth.route.js';     // Import authentication routes
import listingRouter from './routes/listing.route.js';      // Import the listingRouter module for handling listing-related routes
import cookieParser from 'cookie-parser'; // Import cookie-parser middleware
dotenv.config();       // Load environment variables from .env file

mongoose
.connect(process.env.MONGO)   // Connect to MongoDB using the provided connection string
.then(() => {
    console.log('Connected to MongoDB!');   // Log a message if connected successfully
})
.catch((err) =>{
    console.log(err);      // Log error if unable to connect to MongoDB
});

const app = express();      // Create an Express.js application instance

app.use(express.json());              // by default we are not allowed to send JSON file to the server, we need to allow the JSON to input
                                    // Understand incoming JSON requests,// Middleware to handle JSON requests

app.use(cookieParser());       // Extract and interpret the cookie data attached to the incoming request,// Middleware to handle cookies

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000!');  // Log a message when the server starts
    }
);

app.use("/api/user", userRouter);       //giving path file and calling file // Mount user routes at /api/user
app.use('/api/auth', authRouter);         // Mount authentication routes at /api/auth
app.use('/api/listing', listingRouter);    // Attach the listingRouter middleware to handle requests starting with '/api/listing' 

// Error handling middleware
app.use((err, req, res, next) => {      //creating middleware -error comming from input of middleware, req- data from client or browser, respond from server to client and next-to go to next middleware
    const statusCode = err.statusCode || 500;  //statuscode we gonna add is we got from middleware err or if there is no statuscode we use 500,// Get the status code from the error object or use 500 as default
    const message = err.message || 'Internal Server Error';  //if there is no message we have an alnertative message,// Get the error message or use a default message
    return res.status(statusCode).json({                      // Send a JSON response with the error status code and message
        success: false,
        statusCode,
        message,
    });
})

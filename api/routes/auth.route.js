import express from 'express';       // Import the Express framework
import { signOut, signin, signup } from '../controllers/auth.controller.js';  // Import the functions from the auth.controller module

const router = express.Router();      // Create a router instance using Express

// Define routes for signing up, signing in, and signing out
// These routes handle POST requests to /signup, /signin, and GET requests to /signout respectively
router.post("/signup", signup);      // Route for user signup
router.post("/signin", signin);      // Route for user signin
router.get("/signout", signOut);     // Route for user signout

export default router;// Export the router instance to be used in other modules
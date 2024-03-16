import express from 'express';          //importing express to uses route
import { test } from '../controllers/user.controller.js';

const router = express.Router();        //creating a router

router.get('/test', test);

export default router;          // to use this model anywhere else in our application
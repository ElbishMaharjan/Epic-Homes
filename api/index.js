import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err) =>{
    console.log(err);
});

const app = express();

app.use(express.json());              // by default we are not allowed to send JSON file to the server
                                    // we need to allow the JSON to input

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
);

app.use("/api/user", userRouter);       //giving path file and calling file
app.use('/api/auth', authRouter);
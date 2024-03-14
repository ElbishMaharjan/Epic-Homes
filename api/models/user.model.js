import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // creation of method
    username: {
        type: String,
        requried: true,
        unique: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
    },
    password: {
        type: String,
        requried: true,
    }
}, { timestamps:true}); //time of creation and update of user in mongodb

const User = mongoose.model('User', userSchema); //Creating user model

export default User; // to use this model anywhere else in our application
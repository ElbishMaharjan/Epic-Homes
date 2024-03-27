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
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
}, { timestamps:true}); //time of creation and update of user in mongodb

const User = mongoose.model('User', userSchema); //Creating user model

export default User; // to use this model anywhere else in our application
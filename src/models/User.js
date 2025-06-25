// @ts-check

import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username :{
        type: String,
        trim: true,
    },
    email:{
        type: String,
        required : true,
        trim: true,
    },
    password:{
        type: String,
        required : true,
    },
    role:{
        type: String,
        required : true,
        enum: ["amdin", "reader"],
        default: "reader",
    }

}, {timestamps: true});

userSchema.index( {email :"text"});

const User = mongoose.model("User", userSchema);
export default User;
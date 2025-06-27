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
        enum: ["admin", "reader"],
        default: "reader",
    },
    //users can have multiple liked books and chapters
    likedBooks:[{//[] -> array to store users liked Books
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    }],
    favouriteChapters:[{//[] -> array to store users favourite Chapters
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
    }]

}, {timestamps: true});

userSchema.index( {email :"text"});

const User = mongoose.model("User", userSchema);
export default User;
//@ts-check
import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function registerUser(username, email, password, role) {

    if(!email || !password){
        throw new Error('Email and password are required ');
    }
    const currentUser = await User.findOne({email}); 
    if(currentUser){ //if email exists error
        throw new Error('Email already exists ');
    }

    const hashedpassword = await bcrypt.hash(password,10);
    const newUser = new User({username, email, password: hashedpassword, role});
    const savedUser = await newUser.save();
    return savedUser;
}

//authenticate user to login
export async function authenticateUser(email, password) {
                
    if(!email || !password){
        throw new Error('Email and password are required ');
    }

    const currentUser = await User.findOne({email}); 
    if(!currentUser){ //if email doesnot exists error
        throw new Error('Could not found ');
    }

    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);
    if(!isPasswordCorrect){
        throw new Error('Email and password are wrong   ');
    }
    return currentUser;
}
 
// @ts-check
import * as userService from '../services/authService.js';
import * as jwtUtils from '../utils/jwtUtils.js';

export async function registerUser(req, res){
    try {
        const {username, email, password} = req.body;
        const newUser = await userService.registerUser(username, email, password);//register
        
        const token = jwtUtils.generateToken(
             {id: newUser._id, email : newUser.email, role: newUser.role} 
            );
        res.status(201).json({
            message: `user has been successfully registered`,
            access_token: token,
        });     
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function loginuser(req, res){
    try {  
        const { email, password } = req.body;
        const currentUser = await userService.authenticateUser(email, password);//verify email passowrd     
        if(!currentUser){
            res.status(500).json( {message: `Wrong credentials` });
        }
        const token = jwtUtils.generateToken(
             {id: currentUser._id, email : currentUser.email, role: currentUser.role} 
            );
        res.status(200).json({
            message: `user has been successfully loggedIn`,
            access_token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
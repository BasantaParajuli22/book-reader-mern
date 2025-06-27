import express from 'express';
import * as authService from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/auth/register', authService.registerUser);
userRouter.post('/auth/login', authService.loginuser);
userRouter.post('/auth/login', authService.loginuser);

export default userRouter;
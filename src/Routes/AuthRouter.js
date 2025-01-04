import express from 'express';
import { login, logout, signup, verifyToken } from '../Controller/AuthContoller.js';

// creting auth router
const AuthRouter = express.Router();

AuthRouter.post('/login',login);
AuthRouter.get('/verifyToken',verifyToken);
AuthRouter.post('/signup',signup);
AuthRouter.post('/logout',logout);

export default AuthRouter;
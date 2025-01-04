import express from 'express';
import { deleteUser, getUser } from '../Controller/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/',getUser);

UserRouter.delete('/:userid',deleteUser);

// UserRouter.get('/:instaId',getUserById);

export default UserRouter;
import express from 'express';
import { followOneUser, 
    getAllFollowers, 
    getAllFollowing, 
    removeFromFollowers, 
    unfollowOneUser } from '../Controller/FollowController.js';

const FollowRouter = express.Router();

FollowRouter.post('/',followOneUser);
FollowRouter.get('/followers/:userId',getAllFollowers);
FollowRouter.get('/following/:userId',getAllFollowing);
FollowRouter.post('/unfollow',unfollowOneUser);
FollowRouter.delete('/',removeFromFollowers);

export {FollowRouter};
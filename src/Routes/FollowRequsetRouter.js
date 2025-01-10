import express from 'express';
import { createFollowRequest, 
    deleteFollowAckno, 
    deleteRequest, 
    getAllRequests, 
    getFollowAckno} from '../Controller/FollowRequestController.js';

const FollowRequestRouter = express.Router();

FollowRequestRouter.post('/',createFollowRequest);
FollowRequestRouter.get('/:userId',getAllRequests);
FollowRequestRouter.delete('/',deleteRequest);

FollowRequestRouter.get('/ack/:userId',getFollowAckno);
FollowRequestRouter.delete('/ack',deleteFollowAckno);

export default FollowRequestRouter;
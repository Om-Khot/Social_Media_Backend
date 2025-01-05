import express from 'express';
import { createConversation, getConversationsOfaUser } from '../Controller/ConversationController.js';


const ConversationRouter = express.Router();

ConversationRouter.post('/',createConversation);
ConversationRouter.get('/:userId',getConversationsOfaUser); 

export default ConversationRouter;
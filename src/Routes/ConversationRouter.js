import express from 'express';
import { createConversation, getConversationById, getConversationsOfaUser } from '../Controller/ConversationController.js';


const ConversationRouter = express.Router();

ConversationRouter.post('/',createConversation);
ConversationRouter.get('/:userId',getConversationsOfaUser); 

ConversationRouter.get('/one/:conversationId',getConversationById);

export default ConversationRouter;
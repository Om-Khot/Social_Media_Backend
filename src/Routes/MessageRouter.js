import express from 'express';
import { createMessage, getMessages } from '../Controller/MessageController.js';

const MessageRouter = express.Router();

MessageRouter.get('/:conversationId',getMessages);
MessageRouter.post('/',createMessage);

export default MessageRouter;  
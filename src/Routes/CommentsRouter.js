import express from 'express';
import { createComment, getComments } from '../Controller/CommentsController.js';

const CommentsRouter = express.Router();

CommentsRouter.post('/',createComment);
CommentsRouter.get('/:postId',getComments);

export default CommentsRouter;
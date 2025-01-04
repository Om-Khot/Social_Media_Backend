import express from 'express';
import uploader from '../Middlewares/MulterMiddleWare.js';
import { createPost, 
         deletePost, 
         dislikePost, 
         fetchPostsOfOneUser, 
         getAllPosts, 
         getOnePostById, 
         likePost } from '../Controller/PostsController.js';

const PostRouter = express.Router();

PostRouter.post('/',uploader.single('img'), createPost);
PostRouter.get('/',getAllPosts);
PostRouter.get('/one/:postid',getOnePostById);
PostRouter.post('/like',likePost);
PostRouter.post('/dislike',dislikePost);
PostRouter.get('/:userid',fetchPostsOfOneUser);

PostRouter.delete('/:postid',deletePost);

export default PostRouter;
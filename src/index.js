import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PORT } from './Config/serverConfig.js';
import connectDB from './Config/dbConfig.js';
import AuthRouter from './Routes/AuthRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserRouter from './Routes/UserRouter.js';
import PostRouter from './Routes/PostRouter.js';
import SettingsRouter from './Routes/SettingsRouter.js';
import CommentsRouter from './Routes/CommentsRouter.js';
import ConversationRouter from './Routes/ConversationRouter.js';
import MessageRouter from './Routes/MessageRouter.js';
import StoriesRouter from './Routes/StoriesRoute.js';
import FollowRequestRouter from './Routes/FollowRequsetRouter.js';
import { FollowRouter } from './Routes/FollowRoute.js';

const app = express(); // Express app
const server = http.createServer(app); // wrap express app with http server

const io = new Server(server,{
    cors : {
        origin : "https://social-media-app-frontend-peach.vercel.app",
        methods : ["GET","POST"],
        credentials : true
    }
});

app.use(cors({
    origin : "https://social-media-app-frontend-peach.vercel.app",
    credentials : true
}))

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/auth',AuthRouter);
app.use('/user',UserRouter);
app.use('/post',PostRouter);
app.use('/settings',SettingsRouter);
app.use('/comment',CommentsRouter);
app.use('/conversation',ConversationRouter);
app.use('/message',MessageRouter);
app.use('/story',StoriesRouter);
app.use('/followRequest',FollowRequestRouter);
app.use('/follow',FollowRouter);

// socket connection 
io.on('connection',(socket)=>{
    console.log("Socket connected with id",socket.id);
    socket.emit('message','Socket connected successfully');

    // handel disconnect event
    socket.on('disconnect',()=>{
        console.log("Socket disconnected with id",socket.id);
    });
});

server.listen(PORT,()=>{
    console.log("Server has been started on port",PORT);
    connectDB();
});

export {io};

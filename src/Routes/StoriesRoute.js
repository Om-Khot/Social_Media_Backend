import express from "express";
import { createStory, getAllStories } from "../Controller/StoriesContoller.js";
import uploader from "../Middlewares/MulterMiddleWare.js";

const StoriesRouter = express.Router();

StoriesRouter.get('/',getAllStories);
StoriesRouter.post('/',uploader.single('storyMedia'),createStory);

export default StoriesRouter;
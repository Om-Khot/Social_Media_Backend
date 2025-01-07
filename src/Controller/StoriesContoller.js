import { createStoryService, getAllStoriesService } from "../Services/StoriesService.js";

async function createStory(req,res){
    try {
        console.log("req is ",req.body);
        console.log("req is ",req.file);
        const response = await createStoryService({
            author : req.body.author,
            caption : req.body.caption,
            storyMedia : req.file.path
        });
        return res.status(200).json({
            success : true,
            data : response
        })      
    } catch (error) {
        return res.status(500).json({
            success : false, 
            message : error.message
        });        
    }
}

async function getAllStories(req,res){
    try {
        const response = await getAllStoriesService();
        return res.status(200).json({
            success : true,
            data : response
        })      
    } catch (error) {
        return res.status(500).json({
            success : false, 
            message : error.message
        });        
    }
}

export {createStory,getAllStories};
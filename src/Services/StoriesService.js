import cloudinary from "../Config/clodinaryConfig.js";
import { createStoryRepo, getAllStoriesRepo } from "../Repositories/StoriesRepo.js";
import fs from 'fs/promises';

async function createStoryService(storyDetails){   
    
    // upload the story media to cloudinary
    console.log("Story media is",storyDetails.storyMedia);
    try {
        const result = await cloudinary.uploader.upload(storyDetails.storyMedia);
        var storyMediaUrl = result.secure_url;
        await fs.unlink(process.cwd() + '/' + storyDetails.storyMedia);
    } catch (error) {
        throw new Error("Internal server error from cloudinary");
    }
    
    try {        
        const story = await createStoryRepo({
            ...storyDetails,
            media : storyMediaUrl
        });
        return story;
    } catch (error) {
        console.log("Error in createStoryService",error);
        throw new Error("Internal server error from service");
    }    
}

async function getAllStoriesService(){    
    try {        
        const stories = await getAllStoriesRepo();        
        return stories;
    } catch (error) {
        console.log("Error in getAllStoriesService",error);
        throw new Error("Internal server error from service");
    }    
}

export {createStoryService,getAllStoriesService};
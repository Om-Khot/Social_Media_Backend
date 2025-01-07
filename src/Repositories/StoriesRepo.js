import Story from "../Schema/StoriesSchema.js";

async function createStoryRepo(storyDetails){   

    try {        
        const story = await Story.updateOne(
            {author : storyDetails.author},
            {
                $push : {media : {storyMedia : storyDetails.media, caption : storyDetails.caption}}
            },
            {upsert : true},// upsert will create the document if it does not exist
            {new : true}
        );
        return story;
    } catch (error) {
        console.log("Error in createStoryRepo",error);
        throw new Error("Internal server error from repository");
    }    
}

async function getAllStoriesRepo(){    
    try {        
        const stories = await Story.find().populate('author','firstName lastName profileImage').sort({ createdAt : -1 }).exec();        
        return stories;
    } catch (error) {
        console.log("Error in getAllStoriesRepo",error);
        throw new Error("Internal server error from repository");
    }    
}

export {createStoryRepo,getAllStoriesRepo};
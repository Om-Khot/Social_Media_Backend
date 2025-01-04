import { createCommentRepo, getCommentsRepo } from "../Repositories/CommentsRepo.js";

async function createCommentService(author,text,postId){    
    try {
        const response = await createCommentRepo(author,text,postId);
        return response;
    } catch (error) {
        if(error.message == "Internal server error from repository"){
           throw new Error("Internal server error from repository");
        }
        else{
            throw new Error("Internal server error from service");
        }            
    }
}

async function getCommentsService(postId){    
    try {
        const response = await getCommentsRepo(postId);
        return response;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
}

export {createCommentService,getCommentsService};
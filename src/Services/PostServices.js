import fs from 'fs/promises';
import { createPostRepo, 
         deletePostRepo, 
         dislikePostRepo, 
         fetchLikesOfOnePostRepo, 
         fetchOnePostByIdRepo, 
         fetchPostsOfOneUserRepo, 
         getAllPostsRepo, 
         likePostRepo } from '../Repositories/PostRepo.js';
import cloudinary from '../Config/clodinaryConfig.js';

async function createPostService(postDetails){    

    // upload post image to cloudinary
    try {
        const result = await cloudinary.uploader.upload(postDetails.postImage);
        var postImageUrl = result.secure_url;
        await fs.unlink(process.cwd() + '/' + postDetails.postImage);
    } catch (error) {
        throw new Error("Internal server error from cloudinary");
    }

    try {
        console.log("Create post service hits");
        const post = await createPostRepo({
            ...postDetails,
            postImage : postImageUrl,
        });
        return post;
    } catch (error) {
        console.log("Error from create post service",error.message);
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
};

async function getAllPostsService(){    
    try {
        console.log("Get all posts service hits");
        const posts = await getAllPostsRepo();
        return posts;
    } catch (error) {
        console.log("Error from get all posts service",error.message);
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
};

async function likePostService(postId,userId){    
    try {
        console.log("Like post service hits");
        const post = await likePostRepo(postId,userId);
        return post;
    } catch (error) {
        console.log("Error from like post service",error.message);
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
};

async function dislikePostService(postId,userId){    
    try {        
        const post = await dislikePostRepo(postId,userId);        
        return post;
    } catch (error) {
        console.log("Error from dislike post service",error.message);
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }    
};

async function fetchPostsOfOneUserServ(userId){    
    try {
        const posts = await fetchPostsOfOneUserRepo(userId);
        return posts;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
}

async function fetchOnePostByIdServ(postId){    
    try {        
        const post = await fetchOnePostByIdRepo(postId);        
        return post;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function deletePostService(postId){    
    try {        
        const post = await deletePostRepo(postId);        
        return post;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function fetchLikesOfOnePostServ(postId){
    try {
        const post = await fetchLikesOfOnePostRepo(postId);
        return post.likes;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

export {createPostService,
    getAllPostsService,
    likePostService,
    dislikePostService,
    fetchPostsOfOneUserServ,
    fetchOnePostByIdServ,
    deletePostService,
    fetchLikesOfOnePostServ
    };
import { createPostService, 
         deletePostService, 
         dislikePostService, 
         fetchLikesOfOnePostServ, 
         fetchOnePostByIdServ, 
         fetchPostsOfOneUserServ, 
         getAllPostsService, 
         likePostService } from "../Services/PostServices.js";

async function createPost(req,res){
    try {
        console.log("req is ",req.body);
        const response = await createPostService({
            author : req.body.author,
            caption : req.body.caption,
            postImage : req.file.path
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
};

async function getAllPosts(req,res){
    try {
        const response = await getAllPostsService();
        return res.status(200).json({
            success : true,
            data : response
        });
    } catch (error) {
        return res.status(500).json({
            success : false,        
            message : error.message 
        });
    }
};

async function likePost(req,res){
    try {
        console.log("req is",req.body);
        const response = await likePostService(req.body.postId,req.body.userId);
        return res.status(200).json({
            success : true,
            data : response
        });
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
        else return res.status(500).json({
            success : false,
            message : "Internal service error from service"
        });
    }
}

async function dislikePost(req,res){
    try {
        console.log("req is",req.body);
        const response = await dislikePostService(req.body.postId,req.body.userId);
        return res.status(200).json({
            success : true,
            data : response
        });
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
        else return res.status(500).json({
            success : false,
            message : "Internal service error from service"
        });
    }
}

async function fetchPostsOfOneUser(req,res){
    try {
        console.log("controller hits and req.params.userid is",req.params.userid);
        const response = await fetchPostsOfOneUserServ(req.params.userid);        
        return res.status(200).json({
            success : true,
            data : response
        });        
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
        else return res.status(500).json({
            success : false,
            message : "Internal service error from service"
        });
    }    
}

async function getOnePostById(req,res){
    try {
        console.log("controller hits and req.params.postid is",req.params.postid);
        const response = await fetchOnePostByIdServ(req.params.postid);        
        return res.status(200).json({
            success : true,
            data : response
        });        
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
        else return res.status(500).json({
            success : false,
            message : "Internal service error from service"
        });
    }    
}

async function deletePost(req,res){
    console.log("req is",req.params);
    try {
        const result = await deletePostService(req.params.postid);
        return res.status(200).json({
            message : "Post deleted successfully",
            data: result
        });
    } catch (error) {
        console.log("error is",error);
        return res.status(500).json({
            message : "Internal server error",
            error : error
        });
    }
}

async function fetchLikesOfOnePost(req,res){
    try {
        const response = await fetchLikesOfOnePostServ(req.params.postid);  
        console.log("response is",response);      
        return res.status(200).json({
            success : true,
            data : response
        });        
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
        else return res.status(500).json({
            success : false,
            message : "Internal service error from service"
        });
    }    
}

export {createPost,
        getAllPosts,
        likePost,
        dislikePost,
        fetchPostsOfOneUser,
        getOnePostById,
        deletePost,
        fetchLikesOfOnePost
    };
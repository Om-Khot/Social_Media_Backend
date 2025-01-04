import { io } from "../index.js";
import Post from "../Schema/PostsSchema.js";
import User from "../Schema/UserSchema.js";

async function createPostRepo(postDetails) {    
    try {
        const post = await Post.create(postDetails);
        await User.updateOne({ _id: postDetails.author }, { $push: { posts: post._id } });
        const response = await User.findOne({ _id: postDetails.author });
        io.emit('userDetailsUpdated',{userId : postDetails.author,updatedData : response});
        return response;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}
 
async function getAllPostsRepo() {    
    try {
        const posts = await Post.find().populate('author','firstName lastName profileImage').sort({ createdAt : -1 }).exec();        
        return posts;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function likePostRepo(postId,userId){    
    try {        
        const post = await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
        console.log("Post is",post);
        const updatedPost = await Post.findOne({ _id: postId });
        if(post){            
            io.emit('postDetailsUpdated',{
                postId : postId,
                updatedData: {
                    likes : updatedPost.likes
                }
            });
        }        
        console.log("Updated post is",updatedPost);
        return updatedPost;
    } catch (error) {
        console.log("Error is",error);
        throw new Error("Internal server error from repository");
    }    
}

async function dislikePostRepo(postId,userId){    
    try {        
        const post = await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
        const updatedPost = await Post.findOne({ _id: postId });
        if(post){            
            io.emit('postDetailsUpdated',{
                postId : postId,
                updatedData: {
                    likes : updatedPost.likes
                }
            });
        }
        console.log("Updated post is",updatedPost);
        return updatedPost;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function fetchPostsOfOneUserRepo(userId){
    try {
        const posts = await Post.find({ author : userId }).populate('author','firstName lastName profileImage').sort({ createdAt : -1 }).exec();        
        return posts;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function fetchOnePostByIdRepo(postId){    
    try {     
        const post = await Post.findOne({ _id: postId }).populate('author','firstName lastName profileImage').exec();        
        console.log("Post is",post);
        return post;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function deletePostRepo(postId){    
    try {     
        const post = await Post.findOneAndDelete({ _id: postId });
        const user = await User.findOneAndUpdate({ _id: post.author}, { $pull: { posts: postId } }, { new: true });
        if(post){
            console.log("Post is",post);
            console.log("User is",user);
            io.emit('userDetailsUpdated',{
                userId : post.author,
                updatedData : {
                    posts : user.posts
                }
            })
        }        
        return post;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function fetchLikesOfOnePostRepo(postId){    
    try {     
        const post = await Post.findOne({ _id: postId }).populate('likes','firstName lastName profileImage instaId').exec();        
        console.log("Post with all likes is",post);
        return post;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

export { createPostRepo,
        getAllPostsRepo,
        likePostRepo,
        dislikePostRepo ,
        fetchPostsOfOneUserRepo,
        fetchOnePostByIdRepo,
        deletePostRepo,
        fetchLikesOfOnePostRepo
};
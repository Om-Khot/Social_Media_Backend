import Post from "../Schema/PostsSchema.js";
import User from "../Schema/UserSchema.js";
import {io} from '../index.js';

async function findUserRepo(userDetails){
    const email = userDetails.email;
    const instaId = userDetails?.instaId;
    try {
        const user = await User.findOne({
            $or : [{email : email},{instaId : instaId}]
        });
        return user;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function createUserRepo(userDetails){
    try {
        console.log("Create user repo hits");
        const user = await User.create(userDetails);
        return user;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function fetchUserNameRepo(id){
    try {
        const user = await User.findOne({ _id : id });        
        return user;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function updateUserRepo(id,userDetails){    
    console.log("Update user repo hits");
    const updatedData = userDetails;    
    try {        
        const user = await User.updateOne({ _id : id }, { $set : userDetails });
        
        // notify frontend about profile update
        const userId = id;
        if(user){
            io.emit('userDetailsUpdated',{userId,updatedData});
        }        
        return user;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }    
}

async function deleteUserRepo(id){
    try {
        // delete user from database
        const user = await User.deleteOne({ _id : id });
        // delete user all posts from database
        if(!user){
            throw new Error("Internal server error from repository");
        }
        else{
            await Post.deleteMany({ author : id });
            return user
        };
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error from repository");
    }
}

export {findUserRepo,createUserRepo,fetchUserNameRepo,updateUserRepo,deleteUserRepo};
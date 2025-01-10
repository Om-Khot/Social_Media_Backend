import { FollowOneUserRepo, getAllFollowersRepo, getAllFollowingRepo, removeFromFollowersRepo, unfollowOneUserRepo } from "../Repositories/FollowRepo.js";
import User from "../Schema/UserSchema.js";

async function followOneUserServ(selfUserId,followedUserId){    

    console.log("follow one user service hits with self user id:",selfUserId,"and followed user id:",followedUserId);
    // here we have to implement the business logic to follow one user

    // the requested user should not follow himself
    if(selfUserId == followedUserId) {
        throw new Error("You cannot follow yourself");
    }

    // the user should not follow the same user twice  
    
    const requsetedUserFollowers = await User.findOne({ _id : followedUserId , followers: { $in: [selfUserId] } });    
    console.log("requsetedUserFollowers is",requsetedUserFollowers);
    if(requsetedUserFollowers) {
        throw new Error("You are already following this user");
    }

    try {
        const response = await FollowOneUserRepo(selfUserId,followedUserId);       
        return response;
    } catch (error) {
        console.log("Error is",error); 
        throw new Error("Internal server error from repository");
    }
}

async function getAllFollowersServ(userId){    
    try {        
        const followers = await getAllFollowersRepo(userId);
        return followers;
    } catch (error) {
        console.log("Error in getAllFollowersServ",error);
        throw new Error("Internal server error from service");
    }    
}

async function getAllFollowingServ(userId){    
    try {        
        const following = await getAllFollowingRepo(userId);
        return following;
    } catch (error) {
        console.log("Error in getAllFollowingServ",error);
        throw new Error("Internal server error from service");
    }    
}

async function unfollowOneUserServ(selfUserId,followedUserId){    
    try {        
        const response = await unfollowOneUserRepo(selfUserId,followedUserId);
        return response;
    } catch (error) {
        console.log("Error in unfollowOneUserServ",error);
        throw new Error("Internal server error from service");
    }    
}

async function removeFromFollowersServ(selfUserId,followedUserId){    
    try {        
        const response = await removeFromFollowersRepo(selfUserId,followedUserId);
        return response;
    } catch (error) {
        console.log("Error in removeFromFollowersServ",error);
        throw new Error("Internal server error from service");
    }    
}

export {followOneUserServ,
    getAllFollowersServ,
    getAllFollowingServ,
    unfollowOneUserServ,
    removeFromFollowersServ
};
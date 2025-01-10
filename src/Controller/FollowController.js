import { followOneUserServ, 
    getAllFollowersServ, 
    getAllFollowingServ, 
    removeFromFollowersServ, 
    unfollowOneUserServ } from "../Services/FollowServices.js";

async function followOneUser(req,res){
    console.log("controller hits and req.body is",req.body);
    const selfUserId = req.body.selfUserId;
    const followedUserId = req.body.followedUserId;
    try {
        const response = await followOneUserServ(selfUserId,followedUserId);
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
}


async function getAllFollowers(req,res){    
    console.log("controller hits and req.body is",req.params.userId);    
    try {
        const response = await getAllFollowersServ(req.params.userId);
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
}

async function getAllFollowing(req,res){    
    console.log("controller hits and req.body is",req.params.userId);    
    try {
        const response = await getAllFollowingServ(req.params.userId);
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
}

async function unfollowOneUser(req,res){
    console.log(" unfollow controller hits and req.body is",req.body);
    const selfUserId = req.body.selfUserId;
    const followedUserId = req.body.followedUserId;
    try {
        const response = await unfollowOneUserServ(selfUserId,followedUserId);
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
}

async function removeFromFollowers(req,res){    
    console.log("controller hits and req.body is",req.body);    
    const selfUserId = req.body.selfUserId;
    const followedUserId = req.body.followedUserId;
    try {
        const response = await removeFromFollowersServ(selfUserId,followedUserId);
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
}

export {followOneUser,
    getAllFollowers,
    getAllFollowing,
    unfollowOneUser,
    removeFromFollowers
};
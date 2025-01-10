import path from "path";
import { io } from "../index.js";
import User from "../Schema/UserSchema.js";

async function createFollowRequestRepo(followRequestDetails){
    const targetUser = followRequestDetails.targetUser;  // instaId
    const requestedUser = followRequestDetails.requestedUser; // id

    const target = await User.findOne({ instaId: targetUser });

    console.log("Target user is",target);
    if(!target) {
        throw new Error("Target user not found");
    }

    try {
        // add follow req to target user
        const followRequest = await User.findOneAndUpdate({ _id: target._id }, { $push: { followRequests: requestedUser } }, { upsert: true }, { new: true });

        // add acknowledgement slip to requested user
        const acknowledgementSlip = await User.findOneAndUpdate({ _id: requestedUser }, { $push: { ownRequests: target._id } }, { upsert: true }, { new: true });

        // find updated both users
        const res = await User.findOne({ _id: target._id }).populate("followRequests","firstName lastName profileImage instaId");

        const res2 = await User.findOne({ _id: requestedUser }).populate("ownRequests","firstName lastName profileImage instaId");

        io.emit('followReq', {
            userId: target._id,
            updatedData: {
                followRequests: res.followRequests
            }
        });
        io.emit('followAckReq', {
            userId: requestedUser,
            updatedData: {
                ownRequests: res2.ownRequests
            }
        })
        return followRequest;
    } catch (error) {
        console.log("Error from create follow request repo",error);
        throw new Error("Internal server error from repository");
    }
}

async function getAllFollowRequestsRepo(userId){    
    try {
        console.log("Get all follow requests repo hits");
        const followRequests = await User.findOne({ _id: userId }).populate("followRequests","firstName lastName profileImage instaId");       
        return followRequests;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }   
}

async function checkFollowRequestRepo(targetUser,requestedUser){    
    try {
        console.log("Check follow request repo hits with target user:",targetUser,"and requested user:",requestedUser);        
        const followRequest = await User.findOne({ _id: targetUser });
        const req = followRequest.followRequests.includes(requestedUser);                
        return req;
    } catch (error) {
        console.log("Error from check follow request repo",error);
        throw new Error("Internal server error from repository");
    }   
}

async function deleteFollowRequestRepo(followRequestDetails){    
    const targetUser = followRequestDetails.targetUser;
    const requestedUser = followRequestDetails.requestedUser;
    try {
        console.log("Delete follow request repo hits with target user:",targetUser,"and requested user:",requestedUser);    

        // removing follow req from target user follwreq array-> 
        const followRequest = await User.findOneAndUpdate({ _id: targetUser }, { $pull: { followRequests: requestedUser } }, { upsert: true }, { new: true });
        const res = await User.findOne({ _id: targetUser }).populate("followRequests","firstName lastName profileImage instaId");

        // removing ack slip from requested user ownreq array-> 
        const acknowledgementSlip = await User.findOneAndUpdate({ _id: requestedUser }, { $pull: { ownRequests: targetUser } }, { upsert: true }, { new: true });
        const res2 = await User.findOne({ _id: requestedUser }).populate("ownRequests","firstName lastName profileImage instaId");

        io.emit('followReq', {
            userId: targetUser,
            updatedData: {
                followRequests: res.followRequests
            }
        });

        io.emit('followAckReq', {
            userId: requestedUser,
            updatedData: {
                ownRequests: res2.ownRequests
            }
        });
        return followRequest;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }   
}

async function fetchAllAcknowledgementRepo(userId){
    console.log("userid from repo of acknow:",userId);
    try {
        const response = await User.findOne({ _id : userId}).populate("ownRequests","firstName lastName profileImage instaId");
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error from repo");
    }
}

async function deleteFollowAcknowRepo(followAcknowDetails){    
    const userId = followAcknowDetails.userId;
    const targetUser = followAcknowDetails.targetUser;
    try {        
        const followRequest = await User.findOneAndUpdate({ _id: userId }, { $pull: { ownRequests: targetUser } }, { upsert: true }, { new: true });
        const res = await User.findOne({ _id: userId }).populate("ownRequests","firstName lastName profileImage instaId");
        io.emit('followAckReq', {
            userId: userId,
            updatedData: {
                ownRequests: res.ownRequests
            }
        });
        return followRequest;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

export {createFollowRequestRepo,
    getAllFollowRequestsRepo,
    checkFollowRequestRepo,
    deleteFollowRequestRepo,
    fetchAllAcknowledgementRepo,
    deleteFollowAcknowRepo
};
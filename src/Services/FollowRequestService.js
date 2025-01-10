import { checkFollowRequestRepo, 
    createFollowRequestRepo, 
    deleteFollowAcknowRepo, 
    deleteFollowRequestRepo, 
    fetchAllAcknowledgementRepo, 
    getAllFollowRequestsRepo } from "../Repositories/FollowRequestRepo.js";
import User from "../Schema/UserSchema.js";

async function createFollowRequestServ(followRequestDetails){    

    // check if follow request already exist or not
    const target = await User.findOne({ instaId: followRequestDetails.targetUser });
    if(!target) {
        throw new Error("Target user not found");
    }
    const exist = await checkFollowRequestRepo(target._id,followRequestDetails.requestedUser);

    if(exist){        
        throw new Error("Follow request already exist");
    }

    const alreadyFollowing = await User.findOne({ _id : target._id , followers: { $in: [followRequestDetails.requestedUser] } });

    if(alreadyFollowing){
        throw new Error("You are already following this user so you cannot send follow request");
    }

    try {
        console.log("Create follow request service hits");
        const followRequest = await createFollowRequestRepo(followRequestDetails);
        return followRequest;
    } catch (error) {
        console.log("Error from create follow request service",error.message);
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
}

async function getAllRequestsServ(userId){
    try {        
        const followRequests = await getAllFollowRequestsRepo(userId);
        return followRequests;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }
}

async function deleteRequestServ(followRequestDetails){    
    try {        
        const followRequest = await deleteFollowRequestRepo(followRequestDetails);        
        return followRequest;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }    
}

async function fetchFollowAckServ(userId){
    console.log("Fetch acknowlegement service hits with user id:",userId);
    try {
        const acknow = await fetchAllAcknowledgementRepo(userId);
        return acknow;
    } catch (error) {
        console.log(error);
        throw new Error("Internal service error from serivce");
    }
}

async function deleteFollowAckServ(followAcknowDetails){    
    try {        
        const followRequest = await deleteFollowAcknowRepo(followAcknowDetails);        
        return followRequest;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }    
}

export { createFollowRequestServ, 
    getAllRequestsServ, 
    deleteRequestServ,
    fetchFollowAckServ,
    deleteFollowAckServ
};
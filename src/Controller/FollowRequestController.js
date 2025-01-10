import { createFollowRequestServ, 
    deleteFollowAckServ, 
    deleteRequestServ, 
    fetchFollowAckServ, 
    getAllRequestsServ } from "../Services/FollowRequestService.js";

async function createFollowRequest(req,res){    
    console.log("controller hits and req.body is",req.body);
    try {
        const response = await createFollowRequestServ(req.body);
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

async function getAllRequests(req,res){    
    console.log("controller hits and req.body is",req.params.userId);    
    try {
        const response = await getAllRequestsServ(req.params.userId);
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

async function deleteRequest(req,res){    
    console.log("controller hits and req.body is",req.body);    
    try {
        const response = await deleteRequestServ(req.body);
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

async function getFollowAckno(req,res){
    console.log("Get acknowlegement controller hits and req body is",req.params.userId);
    const userId = req.params.userId
    try {
        const response = await fetchFollowAckServ(userId);
        console.log("response is:",response);
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message : error
        });
    }
}

async function deleteFollowAckno(req,res){
    console.log("controller hits and req.body is",req.body);
    try {
        const response = await deleteFollowAckServ(req.body);
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

export {createFollowRequest,
    getAllRequests,
    deleteRequest,
    getFollowAckno,
    deleteFollowAckno
};
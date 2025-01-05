import { createConversationServ, getAllConversationsOfaUserServ } from "../Services/ConversationServices.js";

async function createConversation(req,res){
    console.log("controller hits and req.body is",req.body);
    try {
        const response = await createConversationServ({
            user1 : req.body.user1,
            user2 : req.body.user2
        });
        return res.status(200).json({
            success : true,
            data : response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

async function getConversationsOfaUser(req,res){    
    try {
        const response = await getAllConversationsOfaUserServ(req.params.userId);
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


export {createConversation,getConversationsOfaUser};
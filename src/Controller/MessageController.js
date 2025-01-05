import { createMessageServ, getMessagesServ } from "../Services/MessageService.js";

async function getMessages(req,res){    
    try {
        const response = await getMessagesServ(req.params.conversationId);
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

async function createMessage(req,res){
    console.log("controller hits and req.body is",req.body);
    try {
        const response = await createMessageServ({
            conversationId : req.body.conversationId,
            senderId : req.body.senderId,
            text : req.body.text
        });
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

export {getMessages,createMessage};
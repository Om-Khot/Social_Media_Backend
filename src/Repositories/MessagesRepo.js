import { io } from "../index.js";
import Message from "../Schema/MessageSchema.js";

async function getMessagesRepo(conversationId){
    try {
        const messages = await Message.find({conversationId: conversationId}).populate('senderId','firstName lastName profileImage instaId');
        return messages;
    } catch (error) {
        console.log("Error in getMessagesRepo",error);
        throw new Error("Internal server error from repository");
    }
}

async function createMessageRepo(messageDetails){    
    try {        
        const message = await Message.create(messageDetails);
        const updatedMsg = await Message.find({ _id : message._id }).populate('senderId','firstName lastName profileImage instaId');
        io.emit('messageSent',{msg: updatedMsg[0]});
        return message;
    } catch (error) {
        console.log("Error in createMessageRepo",error);
        throw new Error("Internal server error from repository");
    }    
}

export {getMessagesRepo,createMessageRepo};
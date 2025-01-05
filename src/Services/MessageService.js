import { createMessageRepo, getMessagesRepo } from "../Repositories/MessagesRepo.js";

async function getMessagesServ(conversationId){
    try {
        const messages = await getMessagesRepo(conversationId);
        return messages;
    } catch (error) {
        console.log("Error in getMessagesServ",error);
        throw new Error("Internal server error from service");
    }
}

async function createMessageServ(messageDetails){    
    try {        
        const message = await createMessageRepo(messageDetails);
        return message;
    } catch (error) {
        console.log("Error in createMessageServ",error);
        throw new Error("Internal server error from service");
    }    
}

export {getMessagesServ,createMessageServ};
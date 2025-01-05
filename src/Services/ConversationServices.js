import { createConversationRepo, getAllConversationsOfaUserRepo } from "../Repositories/ConversationsRepo.js";
import Conversation from "../Schema/ConversionScema.js";
import User from "../Schema/UserSchema.js";

async function createConversationServ(conversationDetails){

    const {user1,user2} = conversationDetails;
    // check if user1 and user2 are not same
    if(user1 == user2){
        throw new Error("Cannot create conversation with yourself");
    }
    
    // check if user1 and user2 are valid    
    const res1 = await User.findOne({ _id : user1 });
    const res2 = await User.findOne({ _id : user2 });

    if(!res1 || !res2){
        throw new Error("User not found");
    }

    // check if conversation already exists
    const existingConversation = await Conversation.find({ members : [user1,user2] });    
    if(existingConversation){
        throw new Error("Conversation already exists");
    }
    
    
    try {        
        const conversation = await createConversationRepo(conversationDetails);
        return conversation;
    } catch (error) {
        console.log("Error in createConversationServ",error);
        throw new Error("Internal server error from service");
    }    
}

async function getAllConversationsOfaUserServ(userId){
    try {        
        const conversations = await getAllConversationsOfaUserRepo(userId);
        return conversations;
    } catch (error) {
        console.log("Error in getAllConversationsOfaUserServ",error);
        throw new Error("Internal server error from service");
    }    
}

export {createConversationServ,getAllConversationsOfaUserServ};
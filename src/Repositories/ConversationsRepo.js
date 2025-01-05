import Conversation from "../Schema/ConversionScema.js";

async function createConversationRepo(conversationDetails){
    const {user1,user2} = conversationDetails;
    const participants = [user1,user2];    
    try {        
        const conversation = await Conversation.create({
            members : participants
        });
        return conversation;
    } catch (error) {
        console.log("Error in createConversationRepo",error);
        throw new Error("Internal server error from repository");
    }    
}

async function getAllConversationsOfaUserRepo(userId){
    try {        
        const conversations = await Conversation.find({ members : userId }).populate('members','firstName lastName profileImage instaId');
        return conversations;
    } catch (error) {
        console.log("Error in getAllConversationsOfaUserRepo",error);
        throw new Error("Internal server error from repository");
    }    
}

async function getConversationRepo(conversationId){
    try {        
        const conversation = await Conversation.findOne({ _id : conversationId }).populate('members','firstName lastName profileImage instaId');
        return conversation;
    } catch (error) {
        console.log("Error in getConversationRepo",error);
        throw new Error("Internal server error from repository");
    }    
}

export {createConversationRepo,getAllConversationsOfaUserRepo,getConversationRepo};
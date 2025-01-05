import mongoose from "mongoose";

const ConversionSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ]
},{
    timestamps: true
});

const Conversation = mongoose.model("Conversation",ConversionSchema);

export default Conversation;
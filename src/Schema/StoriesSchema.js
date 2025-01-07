import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    media :[
        {
            storyMedia :{
                type : String,
                required : true
            },
            caption : {
                type : String
            }
        }
    ],
    storylikes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ]
},{
    timestamps : true
});

StorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // expire the story after 24 hours
const Story = mongoose.model("Story",StorySchema);

export default Story;
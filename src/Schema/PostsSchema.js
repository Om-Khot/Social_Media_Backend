import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    caption : {
        type : String,
        minlength : 1,
        required : true
    },
    postImage : {
        type : String,
        required : true
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment",
        }
    ]    
},{
    timestamps : true
});

const Post = mongoose.model("Post",PostSchema);

export default Post;
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
        minLength : 1,
        required : true
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : true
    }

},{
    timestamps : true
});

const Comment = mongoose.model("Comment",CommentSchema);

export default Comment;
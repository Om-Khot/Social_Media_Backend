import Comment from "../Schema/CommentsSchema.js";
import Post from "../Schema/PostsSchema.js";

async function createCommentRepo(author,text,postId){
    try {
        const response = await Comment.create({author,text,postId});
        const post = await Post.updateOne({ _id: postId }, { $push: { comments: response._id } });
        return response;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function getCommentsRepo(postId){
    try {
        const response = await Post.findOne({ _id: postId }).populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
                select: 'firstName lastName'
            }
        }).sort({ createdAt: -1 }).exec();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error from repository");
    }
}

export {createCommentRepo,getCommentsRepo};
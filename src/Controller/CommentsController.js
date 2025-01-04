import { createCommentService, getCommentsService } from "../Services/CommentsService.js";

async function createComment(req,res){

    console.log("Creating comment req body is: ",req.body);
    const {author,text,postId} = req.body;
    
    try {
        const response = await createCommentService(author,text,postId);
        return res.status(200).json({
            success : true,
            message : "Comment created successfully",
            data : response
        });
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            res.status(500).send("Internal server error from repository");
        }
        else{
            res.status(500).send("Internal server error from service");
        }
        
    }
}

async function getComments(req,res){
    console.log("Getting comments for post id: ",req.params.postId);
    try {
        const response = await getCommentsService(req.params.postId);
        return res.status(200).json({
            success : true,
            message : "Comments fetched successfully",
            data : response
        });
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            res.status(500).send("Internal server error from repository");
        }
        else{
            res.status(500).send("Internal server error from service");
        }
    }
}

export {createComment,getComments};
import { deleteUserServ, findUserServ } from "../Services/UserServices.js";

async function getUser(req,res){
    try {
        console.log("req.body",req.body);
        const response = await findUserServ(req.body);
        if(!response){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        } 
        return res.status(200).json({
            success : true,
            data : response
        }); 
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        }); 
    }
}

async function getUserById(req,res){
    try {
        console.log("req is",req.query);
        const response = await findUserServ(req.query);
        if(!response){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        } 
        return res.status(200).json({
            success : true,
            data : response
        }); 
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        }); 
    }
}

async function deleteUser(req,res){
    console.log("req is",req.params);
    try {
        const result = await deleteUserServ(req.params.userid);
        return res.status(200).json({
            message : "User deleted successfully"
        });
    } catch (error) {
        if(error.message == "Internal server error from repository") {
            return res.status(500).json({message : "Internal server error from repository"});
        }
        else if(error.message == "User not found") {
            return res.status(404).json({message : "User not found"});
        }
        else{
            return res.status(500).json({
                message : "Internal server error",
                error: error
            });
        }
    }
}

export {getUser,getUserById,deleteUser};
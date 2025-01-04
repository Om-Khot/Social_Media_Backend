import { updateUserServ } from "../Services/UserServices.js";

async function profileManagement(req,res){
    console.log("Profile Management controller hits",req.body);
    try {
        const response = await updateUserServ({
            id : req.body.id,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            bio : req.body.bio,
            profileImage : req.file?.path,
            gender : req.body.gender
        });
        return res.status(200).json({
            message : "User updated successfully",
            data :  response
        });
    } catch (error) {
        if(error.message == "Internal server error from repository") {
            return res.status(500).json({message : "Internal server error from repository"});
        }
        else if(error.message == "User not found") {
            return res.status(404).json({message : "User not found"});
        }
        else{
            return res.status(500).json({message : "Internal server error"});
        }
    }
}

export {profileManagement};
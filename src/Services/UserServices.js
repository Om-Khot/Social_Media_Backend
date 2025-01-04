import cloudinary from "../Config/clodinaryConfig.js";
import fs from 'fs/promises';
import {findUserRepo,
        createUserRepo, 
        fetchUserNameRepo, 
        updateUserRepo,
        deleteUserRepo} from "../Repositories/UserRepo.js";

async function findUserServ(userDetails){
    try {
        const user = await findUserRepo(userDetails);
        if(!user){
            return null;
        }
        return user;
    } catch (error) {
        if(error.message == "Internal server error from repository"){
            throw new Error(error);
        }
        else if(error.message == "User not found"){
            throw new Error(error);
        }
        else {
            throw new Error("Internal service error from service");
        }        
    }   
}

async function createUserServ(userDetails){    
    try {
        console.log("Create user service hits");
        const user = await findUserServ(userDetails);
        if(user){
            throw new Error("User already exist");
        }

        const newUser = await createUserRepo({
            firstName : userDetails.firstName,
            lastName : userDetails.lastName,
            mobileNo : userDetails.mobileNo,
            email : userDetails.email,
            password : userDetails.password,
            instaId : userDetails.instaId
        });        
        return newUser;
    } catch (error) {
        console.log("Error from create user service",error.message);
        if(error.message == "Internal server error from repository"){
            throw new Error(error);
        }
        else if(error.message == "User already exist"){
            throw new Error(error.message);
        }
        else {
            throw new Error("Internal service error from service");
        }        
    }   
}

async function fetchUserNameServ(id){    
    try {
        const user = await fetchUserNameRepo(id);
        return user;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }   
}

async function updateUserServ(userDetails){    

    // if user sent profile image then update profile image to cloudinary
    if(userDetails.profileImage){
        // update profile image to cloudinary
        try {
            console.log("Profile image is",userDetails.profileImage);
            const response = await cloudinary.uploader.upload(userDetails.profileImage);
            var profileImageUrl = response.secure_url;
            await fs.unlink(process.cwd() + '/' + userDetails.profileImage);
        } catch (error) {
            console.log("Error from update user service",error.message);
        }
    }

    try {
        const id = userDetails.id;        
        const user = await updateUserRepo(id,{
            ...userDetails,
            profileImage : profileImageUrl ? profileImageUrl : ''
        });        
        return user;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }    
}

async function deleteUserServ(id){    
    try {
        const user = await deleteUserRepo(id);        
        return user;
    } catch (error) {
        if(error.message == "Internal server error from repository"){        
            throw new Error(error.message);
        }
        else throw new Error("Internal service error from service");
    }
}

export {findUserServ,createUserServ,fetchUserNameServ,updateUserServ,deleteUserServ};
import { JWT_SECRET } from "../Config/serverConfig.js";
import { loginService, signupService } from "../Services/AuthServices.js";
import jwt from 'jsonwebtoken';
import { findUserServ } from "../Services/UserServices.js";


async function login(req,res){
    try {
        const response = await loginService(req.body);
        res.cookie('AuthToken' , response.token, {
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : 3600000 // 1 hr
        });
        return res.status(200).json({
            success : true,
            data : response,
            info:  response.user
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

async function verifyToken(req,res){
    const token = req.cookies.AuthToken;

    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized"
        });
    }

    try {
        const decode = jwt.verify(token,JWT_SECRET);
        console.log("Decode is",decode);
        const user = await findUserServ({email : decode.email});
        return res.status(200).json({
            success : true,
            data : decode,
            info : user
        });
    } catch (error) {
        console.log("Error is",error);
        return res.status(401).json({
            success : false,
            message : "Invalid token",
            error : error.message
        });
    }
}

async function signup(req,res){
    try {
        const response = await signupService(req.body);
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
};

async function logout(req,res){
    res.clearCookie('AuthToken',{
        httpOnly : true,
        secure : true,
        sameSite : 'strict'
    });
    return res.status(200).json({
        success : true,
        message : "Logout successfully"
    });
}

export {login,signup,verifyToken,logout};
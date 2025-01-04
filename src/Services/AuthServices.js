import {findUserServ,createUserServ} from "../Services/UserServices.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JWT_SECRET,JWT_EXPIRY} from "../Config/serverConfig.js";


async function loginService(userDetails) {
    const plainPassword = userDetails.password;

    // check user exist or not
    const user = await findUserServ(userDetails);
    if (!user) {
        throw new Error("User not found");
    }

    // check password   
    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    
    // if user exist and password is correct then give JWT token
    const token = jwt.sign({ id: user._id , email: user.email}, JWT_SECRET , {
        expiresIn: JWT_EXPIRY,
    });

    console.log("Token is",token);
    return {token,user};
};

async function signupService(userDetails) {
    // create new user
    try {
        console.log("Signup service hits");
        const newUser = await createUserServ(userDetails);
        console.log("New user is",newUser);
        return newUser;
    } catch (error) {
        if(error.message == "User already exist") {
            throw new Error(error);
        }
        else if(error.message == "Internal server error from repository") {
            throw new Error(error);
        }
        else throw new Error("Internal service error from signup service");
    }    
}

export {loginService,signupService};
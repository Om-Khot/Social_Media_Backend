import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: {
        type : String,
        trim : true,
        lowerCase: true,
        require: [true,"first name should be provided"]
    },
    lastName: {
        type : String,
        trim : true,
        lowerCase: true,
        require: [true,"last name should be provided"]
    },
    mobileNo: {
        type: String,
        minLength: 10,
        maxLength: 10,
        require: [true, "Mobile no should be provided"]
    },
    email: {
        type: String,
        unique : true,
        require: [true,"Email should be provided"]
    },
    password : {
        type: String,
        require: [true,"Password should be provided"]
    },
    instaId : {
        type: String,
        unique : true,
        require: [true,"Insta Id should be provided"]
    },
    profileImage : {
        type : String,
    },
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post",
        }
    ],
    bio : {
        type : String,
    },
    gender : {
        type : String,
        enum : ["Male","Female","Other"]
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    followRequests : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    ownRequests : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ]
},{
    timestamps: true
});

UserSchema.pre('save', async function(){
    const hasshedPassword = await bcrypt.hash(this.password , 10);
    this.password = hasshedPassword;
});

const User = new mongoose.model('User',UserSchema);

export default User; 
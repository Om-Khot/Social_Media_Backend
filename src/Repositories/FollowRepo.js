import { io } from "../index.js";
import User from "../Schema/UserSchema.js";

async function FollowOneUserRepo(selfUserId,followedUserId) {
    try {
        const response1 = await User.updateOne({ _id: selfUserId }, { $push: { following: followedUserId } }, { upsert: true });
        const response2 = await User.updateOne({ _id: followedUserId }, { $push: { followers: selfUserId } }, { upsert: true });

        const selfUser = await User.findOne({ _id: selfUserId });
        const requestedUser = await User.findOne({ _id: followedUserId });

        io.emit('userDetailsUpdated', {
            userId: selfUserId,
            updatedData: {
                following: selfUser.following
            }
        });

        io.emit('userDetailsUpdated', {
            userId: followedUserId,
            updatedData: {
                followers: requestedUser.followers
            }
        });

        return {
            selfUser : response1,
            requestedUser : response2
        };
    } catch (error) {
        console.log("Error from follow one user repo",error);
        throw new Error("Internal server error from repository");
    }
}

async function getAllFollowersRepo(userId) {
    try {
        const followers = await User.findOne({ _id: userId }).populate({
            path: "followers",
            select: "firstName lastName profileImage instaId",
            options: { sort: { createdAt: -1 } }
        }).exec();
        return followers;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function getAllFollowingRepo(userId) {
    try {
        const following = await User.findOne({ _id: userId }).populate({
            path: "following",
            select: "firstName lastName profileImage instaId",
            options: { sort: { createdAt: -1 } }
        }).exec();
        return following;
    } catch (error) {
        throw new Error("Internal server error from repository");
    }
}

async function unfollowOneUserRepo(selfUserId,followedUserId) {
    try {
        const response1 = await User.updateOne({ _id: selfUserId }, { $pull: { following: followedUserId } }, { upsert: true });
        const response2 = await User.updateOne({ _id: followedUserId }, { $pull: { followers: selfUserId } }, { upsert: true });

        const selfUser = await User.findOne({ _id: selfUserId });
        const requestedUser = await User.findOne({ _id: followedUserId });

        io.emit('userDetailsUpdated', {
            userId: selfUserId,
            updatedData: {
                following: selfUser.following
            }
        });

        io.emit('userDetailsUpdated', {
            userId: followedUserId,
            updatedData: {
                followers: requestedUser.followers
            }
        });

        return {
            selfUser : response1,
            requestedUser : response2
        };
    } catch (error) {
        console.log("Error from unfollow one user repo",error);
        throw new Error("Internal server error from repository");
    }
}

async function removeFromFollowersRepo(selfUserId,followedUserId) {
    try {
        const response1 = await User.updateOne({ _id: selfUserId }, { $pull: { followers: followedUserId } }, { upsert: true });
        const response2 = await User.updateOne({ _id: followedUserId }, { $pull: { following: selfUserId } }, { upsert: true });

        const selfUser = await User.findOne({ _id: selfUserId });
        const requestedUser = await User.findOne({ _id: followedUserId });

        io.emit('userDetailsUpdated', {
            userId: selfUserId,
            updatedData: {
                followers: selfUser.followers
            }
        });

        io.emit('userDetailsUpdated', {
            userId: followedUserId,
            updatedData: {
                following: requestedUser.following
            }
        });

        return {
            selfUser : response1,
            requestedUser : response2
        };
    } catch (error) {
        console.log("Error from unfollow one user repo",error);
        throw new Error("Internal server error from repository");
    }
}

export {FollowOneUserRepo,
    unfollowOneUserRepo,
    getAllFollowersRepo,
    getAllFollowingRepo,
    removeFromFollowersRepo
};
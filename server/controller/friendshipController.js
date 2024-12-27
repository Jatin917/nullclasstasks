import mongoose from "mongoose";
import userschema from '../models/auth.js'

export const friendReqController = async (req, res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const toId = req.userid;
        const {fromId} = req.body;
        if(!toId){
            return res.status(401).json({message:"to id is invalid"});
        }
        if(!fromId){
            return res.status(401).json({message:"from id is invalid"});
        }
        const reqSent = await userschema.findOneAndUpdate(
            { _id: toId, friend_requests_sent: { $ne: fromId } },
            { $push: { friend_requests_sent: fromId } }, 
            { session }
        );
        if(!reqSent){
            await session.abortTransaction();
            throw new Error("error in sending request");
        }
        const reqPending = await userschema.findOneAndUpdate(
            { _id: fromId, friend_requests_pending: { $ne: toId } },
            { $push: {friend_requests_pending: toId}},
            { session }
        );
        if(!reqPending){
            await session.abortTransaction();
            throw new Error("error in recieving request");
        }
        session.commitTransaction();
        return res.status(200).json({message:"Friend Request Sent Successfully"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
    finally {
        session.endSession();
      }
}

export const acceptReqController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userid;
        const { reqId } = req.body;

        if (!reqId) {
            // await session.abortTransaction();
            throw new Error("Request ID is not defined");
        }

        // Remove the request from the user's sent requests
        const removeFromSent = await userschema.findOneAndUpdate(
            { _id: userId },
            { $pull: { friend_requests_sent: reqId } },
            { session }
        );
        if (!removeFromSent) {
            // await session.abortTransaction();
            throw new Error("Error in removing request from sent");
        }

        // Add the requester to the user's friends list
        const addToFriend = await userschema.findOneAndUpdate(
            { _id: userId, friends: { $ne: reqId } },
            { $push: { friends: reqId } },
            { session }
        );
        if (!addToFriend) {
            // await session.abortTransaction();
            throw new Error("Error in adding request to friends list");
        }

        // Remove the request from the requester's pending requests
        const removeFromPending = await userschema.findOneAndUpdate(
            { _id: reqId },
            { $pull: { friend_requests_pending: userId } },
            { session }
        );
        if (!removeFromPending) {
            // await session.abortTransaction();
            throw new Error("Error in removing request from pending");
        }

        // Add the user to the requester's friends list
        const addToFriendInFriend = await userschema.findOneAndUpdate(
            { _id: reqId, friends: { $ne: userId } },
            { $push: { friends: userId } },
            { session }
        );
        if (!addToFriendInFriend) {
            // await session.abortTransaction();
            throw new Error("Error in adding user to friend's friends array");
        }

        // Commit the transaction
        await session.commitTransaction();
        return res.status(200).json({ message: "Friend Request Accepted Successfully" });

    } catch (error) {
        // Abort transaction in case of an error
        await session.abortTransaction();
        return res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
};

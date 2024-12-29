import mongoose from "mongoose";
import userschema from '../models/auth.js'
import postSchema from "../models/postSchema.js";

export const friendReqController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const toId = req.userid;
        const { fromId } = req.body;

        // Validate input
        if (!toId) {
            return res.status(401).json({ message: "Recipient ID is invalid" });
        }
        if (!fromId) {
            return res.status(401).json({ message: "Sender ID is invalid" });
        }

        // Step 1: Update recipient's "friend_requests_sent" array
        const reqSent = await userschema.findOneAndUpdate(
            { _id: toId, friend_requests_sent: { $ne: fromId } },
            { $push: { friend_requests_sent: fromId } },
            { session, new: true }
        );
        if (!reqSent) {
            throw new Error("Error in sending request");
        }

        // Step 2: Update sender's "friend_requests_pending" array
        const reqPending = await userschema.findOneAndUpdate(
            { _id: fromId, friend_requests_pending: { $ne: toId } },
            { $push: { friend_requests_pending: toId } },
            { session, new: true }
        );
        if (!reqPending) {
            throw new Error("Error in receiving request");
        }

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        // Populate data after transaction completes
        const populatedSent = await userschema
            .findOne({ _id: toId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        const populatedPending = await userschema
            .findOne({ _id: fromId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        return res.status(200).json({
            message: "Friend Request Sent Successfully",
            sent: populatedSent,
            pending: populatedPending,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};

export const acceptReqController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userid;
        const { reqId } = req.body;

        if (!reqId) {
            throw new Error("Request ID is not defined");
        }

        // Step 1: Add the requester to the user's friends list and remove from sent requests
        const addToFriend = await userschema.findOneAndUpdate(
            { _id: userId, friends: { $ne: reqId } },
            {
                $pull: { friend_requests_pending: reqId },
                $push: { friends: reqId },
            },
            { session, new: true }
        );
        if (!addToFriend) {
            throw new Error("Error in adding request to friends list");
        }
        // console.log(addToFriend);
        // Step 2: Add the user to the requester's friends list and remove from pending requests
        const addToFriendInFriend = await userschema.findOneAndUpdate(
            { _id: reqId, friends: { $ne: userId } },
            {
                $pull: { friend_requests_sent: userId },
                $push: { friends: userId },
            },
            { session, new: true }
        );
        if (!addToFriendInFriend) {
            throw new Error("Error in adding user to friend's friends array");
        }
        // console.log(addToFriendInFriend)
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate after the transaction is committed
        const populatedAddToFriend = await userschema
            .findOne({ _id: userId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        const populatedAddToFriendInFriend = await userschema
            .findOne({ _id: reqId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        return res.status(200).json({
            message: "Friend Request Accepted Successfully",
            sent: populatedAddToFriend,
            pending: populatedAddToFriendInFriend,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};

export const rejectReqController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userid;
        const { reqId } = req.body;

        if (!reqId) {
            throw new Error("Request ID is not defined");
        }

        const removeFromPendingReq = await userschema.findOneAndUpdate(
            { _id: userId },
            {
                $pull: { friend_requests_pending: reqId },
            },
            { session, new: true }
        );
        if (!removeFromPendingReq) {
            throw new Error("Error in adding request to friends list");
        }
        // console.log(addToFriend);
        // Step 2: Add the user to the requester's friends list and remove from pending requests
        const removeFromSentReq = await userschema.findOneAndUpdate(
            { _id: reqId },
            {
                $pull: { friend_requests_sent: userId },
            },
            { session, new: true }
        );
        if (!removeFromSentReq) {
            throw new Error("Error in adding user to friend's friends array");
        }
        // console.log(addToFriendInFriend)
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate after the transaction is committed
        const populatedremoveFromPendingReq = await userschema
            .findOne({ _id: userId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        const populatedremoveFromSentReq = await userschema
            .findOne({ _id: reqId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        return res.status(200).json({
            message: "Friend Request Accepted Successfully",
            sent: populatedremoveFromPendingReq,
            pending: populatedremoveFromSentReq,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};

export const cancelReqController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.body.reqId;
        const reqId = req.userid;

        if (!reqId) {
            throw new Error("Request ID is not defined");
        }

        const removeFromPendingReq = await userschema.findOneAndUpdate(
            { _id: userId },
            {
                $pull: { friend_requests_pending: reqId },
            },
            { session, new: true }
        );
        if (!removeFromPendingReq) {
            throw new Error("Error in adding request to friends list");
        }
        // console.log(addToFriend);
        // Step 2: Add the user to the requester's friends list and remove from pending requests
        const removeFromSentReq = await userschema.findOneAndUpdate(
            { _id: reqId },
            {
                $pull: { friend_requests_sent: userId },
            },
            { session, new: true }
        );
        if (!removeFromSentReq) {
            throw new Error("Error in adding user to friend's friends array");
        }
        // console.log(addToFriendInFriend)
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate after the transaction is committed
        const populatedremoveFromPendingReq = await userschema
            .findOne({ _id: userId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        const populatedremoveFromSentReq = await userschema
            .findOne({ _id: reqId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        return res.status(200).json({
            message: "Friend Request Accepted Successfully",
            sent: populatedremoveFromPendingReq,
            pending: populatedremoveFromSentReq,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};

export const unFriendController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.userid;
        const { reqId } = req.body;

        if (!reqId) {
            throw new Error("Request ID is not defined");
        }

        const removeFromFriend = await userschema.findOneAndUpdate(
            { _id: userId },
            {
                $pull: { friends: reqId },
            },
            { session, new: true }
        );
        if (!removeFromFriend) {
            throw new Error("Error in adding request to friends list");
        }
        // console.log(addToFriend);
        const removeFromFriendInFriend = await userschema.findOneAndUpdate(
            { _id: reqId },
            {
                $pull: { friends: userId },
            },
            { session, new: true }
        );
        if (!removeFromFriendInFriend) {
            throw new Error("Error in adding user to friend's friends array");
        }
        // console.log(addToFriendInFriend)
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Populate after the transaction is committed
        const populatedremoveFromFriend = await userschema
            .findOne({ _id: userId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        const populatedremoveFromFriendInFriend = await userschema
            .findOne({ _id: reqId })
            .populate({ path: "posts", select: "title" })
            .populate({ path: "friends", select: "name profilePicture" })
            .populate({ path: "friend_requests_sent", select: "name profilePicture" })
            .populate({ path: "friend_requests_pending", select: "name profilePicture" });

        return res.status(200).json({
            message: "Friend Request Accepted Successfully",
            sent: populatedremoveFromFriend,
            pending: populatedremoveFromFriendInFriend,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};



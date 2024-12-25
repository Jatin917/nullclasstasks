import mongoose from "mongoose";
import userschema from '../models/auth.js'

export const friendReqController = async (req, res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {toId, fromId} = req.body;
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
        return res.status(200).json({message:"Friend Request Successfully"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
    finally {
        session.endSession();
      }
}
import mongoose from "mongoose";
 const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    provider:{type:String, default:"local"},
    profilePicture:{
      type:String,
      default:null
    },
    posts: [
    {
      ref:'Post',
      type:mongoose.Schema.Types.ObjectId,
      createdAt: { type: Date, default: Date.now },
    },
  ],
    friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  friend_requests_pending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  friend_requests_sent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
   //  id:{type:String},
    about:{type:String},
    tags:{type:[String]},
    joinedon:{type:Date,default:Date.now}
 })

 export default mongoose.model("User",userschema)
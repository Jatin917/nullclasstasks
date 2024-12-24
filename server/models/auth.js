import mongoose from "mongoose";
 const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    provider:{type:String, default:"local"},
   //  id:{type:String},
    about:{type:String},
    tags:{type:[String]},
    joinedon:{type:Date,default:Date.now}
 })

 export default mongoose.model("User",userschema)
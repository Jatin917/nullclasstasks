import mongoose from 'mongoose';
import userschema from '../models/auth.js'
import postSchema from '../models/postSchema.js';
export const doPostController = async (req, res) => {
  const userId = req.userid;
  const session = await mongoose.startSession();

  try {
      const user = await userschema.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const friendsCount = user.friends.length;

      if (friendsCount === 0) {
          return res
              .status(403)
              .json({ message: "You cannot post as you don't have any friends" });
      }

      // Calculate the start of the day
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      // Check posts made today
      const postsTodayCount = await postSchema.countDocuments({
          user_id: userId,
          createdAt: { $gte: startOfDay },
      });

      if (friendsCount < 10 && postsTodayCount >= friendsCount) {
          return res
              .status(403)
              .json({ message: "Daily post limit reached. Please try again tomorrow" });
      }

      const postData = req.body;
      session.startTransaction();

      // Create the post and link it to the user
      const postRes = await postSchema.create([{ ...postData, user_id: userId }], { session });
      const updatedUser = await userschema.findByIdAndUpdate(
          userId,
          { $push: { posts: postRes[0]._id } },
          { session }
      );

      if (!postRes || !updatedUser) {
          throw new Error("Error while creating the post");
      }

      await session.commitTransaction();
      return res.status(201).json({ post: postRes[0], message: "Post created successfully" });
  } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ message: error.message });
  } finally {
      session.endSession();
  }
};

export const commentController = async (req, res) =>{
try {
    const userId = req.userid;
    const postId = req.params.id;
    const {content} = req.body;
    const newPost = await postSchema.findByIdAndUpdate(postId, {$push : {comments:{user_id:userId, content}}});
    if(!newPost){
        console.log("error in adding comment");
        throw new error("error in adding comment");
    }
    return res.status(200).json({message: "Successfully added comment"});
} catch (error) {
    return res.status(500).json({message:error.message});
}
}

export const likeController = async (req, res) =>{
try {
    const userId = req.userid;
    const postId = req.params.id;
    const newPost = await postSchema.findByIdAndUpdate(postId, {$addToSet : {likes:userId}});
    if(!newPost){
        throw new error("error in adding like");
    }
    return res.status(200).json({status:200,message: "Successfully Liked the post", newPost});
} catch (error) {  
    return res.status(500).json({status:500,message:error.message});
}
}

export const sharesController = async (req, res) =>{
try {
    const userId = req.userid;
    const postId = req.params.id;
    const newPost = await postSchema.findByIdAndUpdate(postId, {$push : {shares:{user_id:userId}}});
    if(!newPost){
        throw new error("error in sharing");
    }
    return res.status(200).json({message: "Successfully shared post"});
} catch (error) {
    return res.status(500).json({message:error.message});
}
}

export const unlikeController = async (req, res) =>{
    try {
        const userId = req.userid;
        const postId = req.params.id;
        const newPost = await postSchema.findByIdAndUpdate(postId, {$pull : {likes:userId}});
        if(!newPost){
            throw new error("error in removing like");
        }
        return res.status(200).json({message: "Successfully UnLiked the post", newPost});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
    }

export const getUserPost = async (req, res) =>{
  try {
    const postId = req.params.id;
    const post = await postSchema.findById(postId).populate({path:"comments.user_id", select:"name"});
    console.log(post)
    if(!post){
      return res.json("error while fetching post");
    }
    return res.status(200).json({post});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}
export const getAllPost = async (req, res) =>{
  try {
    const post = await postSchema.find().populate({path:"comments.user_id", select:"name profilePicture"}).populate({path:"user_id", select:"name ProfilePicture"});
    if(!post){
      return res.json("error while fetching post");
    }
    return res.status(200).json({post});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}

import userschema from '../models/auth.js'
import postSchema from '../models/postSchema.js';
export const doPostController = async (req, res) => {
    const userId = req.userid;
  
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

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
 
      const postsToday = user.posts.filter(
        (post) => post.createdAt >= startOfDay
      );

      if (friendsCount < 10 && postsToday.length >= friendsCount) {
        return res
          .status(403)
          .json({ message: "Daily post limit reached. Please try again tomorrow" });
      }

      const post = req.body;
      const postRes = await postSchema.create({ ...post, user_id: userId });
  
      if (!postRes) {
        throw new Error("Error while posting");
      }
  
      return res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
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
    return res.status(200).json({message: "Successfully Liked the post"});
} catch (error) {
    return res.status(500).json({message:error.message});
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
        return res.status(200).json({message: "Successfully UnLiked the post"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
    }
    

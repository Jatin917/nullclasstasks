import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disLikePost, likePost } from "../../action/post";
import { useNavigate } from "react-router-dom";

const LikeComponent = ({setLikedLen, postId, likes, isLiked, setIsLiked}) => {
  const token = !!(JSON.parse(localStorage.getItem('Profile'))?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLike(id){
    console.log("handle like")
    if(!token){
      alert("You need to signup or login first");
      navigate("/auth");
    }
    else{
      const response = await dispatch(likePost(id));
      if(response.success){
        setIsLiked(true);
        setLikedLen(prev=>prev+1)
        console.log("Liked Post");
      }
      else{
        console.log("Liking post failed");
      }
    }
  }
  async function handleUnLike(id){
    console.log("handle dislike")
    if(!token){
      alert("You need to signup or login first");
      navigate("/auth");
    }
    else{
      const response = await dispatch(disLikePost(id));
      if(response.success){
        setIsLiked(false);
        setLikedLen(prev=>prev-1)
        console.log("Dis Liked Post");
      }
      else{
        console.log("Dis Liking post failed");
      }
    }
  }
  useEffect(()=>{
    currentUserLiked(likes);
  },[likes]);
  const currentUserId = useSelector((state)=>state.currentuserreducer?.result?._id);
  function currentUserLiked(likedUserId){
    for(let i = 0;i<likedUserId.length;i++){
      if(likedUserId[i]===currentUserId){
        setIsLiked(true);
        return;
      } 
    }
    setIsLiked(false);
  }
  return (
    <button
      onClick={() => {
        isLiked ? handleUnLike(postId) : handleLike(postId);
      }}
      className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
    >
      <Heart
        size={20}
        className={`stroke-2 ${
          isLiked ? "fill-red-500 text-red-500" : "fill-none text-gray-500"
        }`}
      />
      <span className="text-sm">Like</span>
    </button>
  );
};

export default LikeComponent;

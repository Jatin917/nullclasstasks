import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disLikePost, likePost } from "../../action/post";
import { useNavigate } from "react-router-dom";
import { staticTranslator } from "../../services";

const LikeComponent = ({post, isLiked, setIsLiked }) => {
  const targetLang = localStorage.getItem("lang") || ""
  const token = !!JSON.parse(localStorage.getItem("Profile"))?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLike(id) {
    console.log("handle like");
    if (!token) {
      alert(staticTranslator("alertLoginMsg", targetLang));
      navigate("/auth");
    } else {
      const response = await dispatch(likePost(id));
      if (response.success) {
        setIsLiked(true);
        console.log("Liked Post");
      } else {
        console.log("Liking post failed");
      }
    }
  }
  async function handleUnLike(id) {
    console.log("handle dislike");
    if (!token) {
      alert(staticTranslator("alertLoginMsg", targetLang));
      navigate("/auth");
    } else {
      const response = await dispatch(disLikePost(id));
      if (response.success) {
        setIsLiked(false);
        console.log("Dis Liked Post");
      } else {
        console.log("Dis Liking post failed");
      }
    }
  }
  useEffect(() => {
    currentUserLiked(post?.likes);
  }, [post?.likes]);
  const currentUserId = useSelector(
    (state) => state.currentuserreducer?.result?._id
  );
  function currentUserLiked(likedUserId) {
    for (let i = 0; i < likedUserId.length; i++) {
      if (likedUserId[i] === currentUserId) {
        setIsLiked(true);
        return;
      }
    }
    setIsLiked(false);
  }
  return (
    <>
      <button
        onClick={()=>handleLike(post?._id)}
        disabled={isLiked}
        className={`p-1 hover:bg-gray-100 rounded ${
          isLiked ? "text-orange-500 cursor-not-allowed" : "text-gray-500 cursor-pointer"
        }`}
      >
        <ChevronUp size={36} />
      </button>
      <span className="text-xl font-medium my-2">
        {post?.likes?.length || 0}
      </span>
      <button 
        onClick={()=>handleUnLike(post._id)} 
        disabled={!isLiked}
        className={`p-1 hover:bg-gray-100 rounded ${
            !isLiked ? "text-orange-500 cursor-not-allowed" : "text-gray-500 cursor-pointer"
          }`}
      >
        <ChevronDown size={36} />
      </button>
    </>
  );
};

export default LikeComponent;

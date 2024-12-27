import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentOnPost } from "../../action/post";
import { Send } from "lucide-react";
import sampleUser from '../../assets/SampleUser.png'

const CommentComponent = ({ postId, setDisplayedComments }) => {
  const token = !!JSON.parse(localStorage.getItem("Profile"))?.token;
  const currentUserImg = useSelector((state)=>state.currentuserreducer?.result?.profilePicture);
const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleComment(id, comment) {
    console.log("handle Comment ", comment);
    if (!token) {
      alert("You need to signup or login first");
      navigate("/auth");
    } else {
      const response = await dispatch(commentOnPost(id, comment));
      if (response.success) {
        console.log("Commented on Post");
      } else {
        console.log("Commenting on post failed");
      }
    }
    setNewComment('');
  }
  return (
    <div className="flex items-center space-x-2 mt-2">
      <img
        src={currentUserImg || sampleUser}
        alt="Your avatar"
        className="w-6 h-6 rounded-full"
      />
      <div className="flex-1 relative">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-3 py-1 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button onClick={()=>handleComment(postId, newComment)} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default CommentComponent;

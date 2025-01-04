import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentOnPost } from "../../action/post";
import { Send } from "lucide-react";
import sampleUser from '../../assets/SampleUser.png'
import { staticTranslator } from "../../services";

const CommentComponent = ({ postId, setDisplayedComments }) => {
  const targetLang = localStorage.getItem("lang") || ""
  const token = !!JSON.parse(localStorage.getItem("Profile"))?.token;
  const currentUserImg = useSelector((state)=>state.currentuserreducer?.result?.profilePicture);
const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleComment(id, comment) {
    console.log("handle Comment ", comment);
    if (!token) {
      alert(staticTranslator("You need to signup or login first", targetLang));
      navigate("/auth");
    } else {
      const response = dispatch(commentOnPost(id, comment));
      if (response.success) {
        console.log("Commented on Post");
      } else {
        console.log("Commenting on post failed");
      }
    }
    setNewComment('');
  }
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem", // Equivalent to space-x-2
      marginTop: "0.5rem", // Equivalent to mt-2
    },
    avatar: {
      width: "1.5rem", // Equivalent to w-6
      height: "1.5rem", // Equivalent to h-6
      borderRadius: "9999px", // Equivalent to rounded-full
    },
    inputWrapper: {
      flex: 1, // Equivalent to flex-1
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "0.55rem",
      backgroundColor: "#f9fafb", 
      borderRadius: "9999px",
      fontSize: "0.875rem", 
      outline: "none",
      border: "1px solid transparent", 
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: "none",
    },
    inputFocus: {
      outline:"none",
      border:"none",
      borderColor: "#3b82f6", 
      // boxShadow: "0 0 0 1px #3b82f6", 
    },
    sendButton: {
      backgroundColor:"inherit",
      border:"none",
      outline:"none",
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)", 
      color: "#3b82f6",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    sendButtonHover: {
      color: "#2563eb", // Equivalent to hover:text-blue-600
    },
  };
  
  return (
    <div style={styles.container}>
      <img
        src={currentUserImg || sampleUser}
        alt="Your avatar"
        style={styles.avatar}
      />
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={staticTranslator("Add a comment...", targetLang)}
          style={styles.input}
          onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
          onBlur={(e) =>
            Object.assign(e.target.style, { borderColor: "transparent", boxShadow: "none" })
          }
        />
        <button
          onClick={() => handleComment(postId, newComment)}
          style={styles.sendButton}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.sendButtonHover)}
          onMouseLeave={(e) =>
            Object.assign(e.target.style, { color: styles.sendButton.color })
          }
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};  

export default CommentComponent;

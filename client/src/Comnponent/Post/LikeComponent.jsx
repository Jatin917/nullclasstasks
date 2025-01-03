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
  const styles = {
    button: {
      base: {
        padding: "0.25rem",
        borderRadius: "0.25rem",
        transition: "background-color 0.15s ease-in-out",
        border:"none",
        outline:"none",
        backgroundColor:"inherit",
      },
      active: {
        color: "orange",
        border:"none",
        outline:"none",
        backgroundColor:"inherit",
        cursor: "not-allowed",
        // backgroundColor: "rgba(0, 0, 0, 0.02)", // hover effect
      },
      inactive: {
        border:"none",
        outline:"none",
        backgroundColor:"inherit",
        color: "gray",
        cursor: "pointer",
        // backgroundColor: "rgba(0, 0, 0, 0.02)", // hover effect
      },
    },
    count: {
      base: {
        fontSize: "1.25rem",
        fontWeight: "500",
        margin: "0.5rem 0",
      },
    },
  };
  
  return (
    <>
      <button
        onClick={() => handleLike(post?._id)}
        disabled={isLiked}
        style={{
          ...styles.button.base,
          ...(isLiked ? styles.button.active : styles.button.inactive),
        }}
      >
        <ChevronUp size={36} />
      </button>
  
      <span style={styles.count.base}>{post?.likes?.length || 0}</span>
  
      <button
        onClick={() => handleUnLike(post._id)}
        disabled={!isLiked}
        style={{
          ...styles.button.base,
          ...(!isLiked ? styles.button.active : styles.button.inactive),
        }}
      >
        <ChevronDown size={36} />
      </button>
    </>
  );
  
};

export default LikeComponent;

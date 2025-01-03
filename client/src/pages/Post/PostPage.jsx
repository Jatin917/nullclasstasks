import React, { useDebugValue, useEffect } from "react";
import PostCard from "../../Comnponent/Post/PostCard";
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar";
import { useSelector } from "react-redux";
import { staticTranslator } from "../../services";

const PostPage = ({slidein}) => {
  const posts = useSelector((state)=> state.translatedPostDataReducer); 
  const targetLang = localStorage.getItem("lang"); 
  console.log("updated post", posts);

  const styles = {
    container: {
      display: 'flex',
      minHeight: 'calc(100vh - 100px)',
      maxWidth: '1250px',
      margin: '0 auto',
    },
    mainContent: {
      marginTop: '60px',
      flex: 1,
      padding: '16px',
      overflow: 'auto',
      height: 'calc(100vh - 100px)',
    },
    singleColumnLayout: {
      maxWidth: '768px', // Equivalent to max-w-3xl
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px', // Equivalent to space-y-4
    },
    noPostsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '128px', // Equivalent to h-32
      backgroundColor: 'white',
      borderRadius: '8px', // Equivalent to rounded-lg
      border: '1px solid #e5e7eb', // Equivalent to border border-gray-200
    },
    noPostsText: {
      color: '#4b5563', // Equivalent to text-gray-600
    },
  };
  
  return (
    <div style={styles.container}>
      <Leftsidebar slidein={slidein} />
  
      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {/* Single Column Layout for StackOverflow-style cards */}
        <div style={styles.singleColumnLayout}>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id}>
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <div style={styles.noPostsContainer}>
              <p style={styles.noPostsText}>
                {staticTranslator("No posts available", targetLang)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default PostPage;

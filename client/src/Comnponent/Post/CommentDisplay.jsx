import React from "react";
import sampleUser from '../../assets/SampleUser.png'
import { staticTranslator } from "../../services";

const CommentDisplay = ({
    post,
    setShowAllComments,
    showAllComments
}) => {
  const targetLang = localStorage.getItem("lang");
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };
  const displayedComments = showAllComments ? post.comments : post.comments.slice(0, 2);
  const styles = {
    container: {
      borderTop: "1px solid #e5e7eb", // Equivalent to border-t border-gray-200
      paddingTop: "1rem", // Equivalent to pt-4
      marginTop: "1rem", // Equivalent to mt-4
    },
    commentsWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem", 
    },
    commentItem: {
      display: "flex",
      gap: "0.75rem", 
      fontSize: "0.875rem", 
      borderBottom: "1px solid #f3f4f6",
      paddingBottom: "0.75rem", 
    },
    avatar: {
      width: "1.5rem", 
      height: "1.5rem",
      borderRadius: "0.25rem", 
    },
    contentWrapper: {
      flex: 1, 
    },
    commentText: {
      fontSize: "0.875rem", 
      color: "#1f2937",
    },
    metadataWrapper: {
      display: "flex",
      alignItems: "center", 
      gap: "0.5rem", 
      marginTop: "0.5rem",
    },
    userName: {
      fontSize: "0.75rem", 
      color: "#2563eb", 
    },
    timestamp: {
      fontSize: "0.75rem",
      color: "#6b7280", 
    },
    showMoreButton: {
      border:"none",
      outline:"none",
      backgroundColor:"inherit",
      marginTop: "0.75rem", 
      fontSize: "0.875rem", 
      color: "#2563eb", //
      cursor: "pointer",
      transition: "color 0.2s",
    },
    showMoreButtonHover: {
      color: "#1e40af", 
    },
  };
  
  return (
    <>
      {post.comments.length > 0 && (
        <div style={styles.container}>
          <div style={styles.commentsWrapper}>
            {displayedComments.map((comment, index) => (
              <div key={index} style={styles.commentItem}>
                <img
                  src={comment.user_id.profilePicture || sampleUser}
                  alt={`${comment.user_id.name} avatar`}
                  style={styles.avatar}
                />
                <div style={styles.contentWrapper}>
                  <div style={styles.commentText}>{comment.content}</div>
                  <div style={styles.metadataWrapper}>
                    <span style={styles.userName}>{comment.user_id.name}</span>
                    <span style={styles.timestamp}>
                      {staticTranslator("commented", targetLang)} {formatDate(comment.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {post.comments.length > 2 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              style={styles.showMoreButton}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.showMoreButtonHover)}
              onMouseLeave={(e) =>
                Object.assign(e.target.style, { color: styles.showMoreButton.color })
              }
            >
              {staticTranslator("Show", targetLang)} {post.comments.length - 2}{" "}
              {staticTranslator("more comments", targetLang)}
            </button>
          )}
        </div>
      )}
    </>
  );
  
};

export default CommentDisplay;

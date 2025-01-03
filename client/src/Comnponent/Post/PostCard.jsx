import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, MessageCircle, BookmarkPlus } from 'lucide-react';
import sampleUser from '../../assets/SampleUser.png';
import LikeComponent from './LikeComponent';
import CommentComponent from './CommentComponent';
import CommentDisplay from './CommentDisplay';
import ShareDialog from './ShareDialog';
import { staticTranslator } from '../../services';
import './postCard.css'

const PostCard = ({ post }) => {
  const targetLang = localStorage.getItem("lang") || "";
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  function formatDateWithWeekday(isoDate) {
    const date = new Date(isoDate);
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  if (!post) {
    return <p>{staticTranslator("No post data available.", targetLang)}</p>;
  }

  const StyledLikeButtons = () => (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <LikeComponent
        post={post}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
    </div>
  );
  return (
    <div className="post-card">
      <div className="post-grid">
        {/* Vote Column */}
        <div className="vote-column">
          <StyledLikeButtons />
          <button className="bookmark-button">
            <BookmarkPlus size={20} />
          </button>
        </div>

        {/* Main Content Column */}
        <div className="post-content">
          {/* Post Header */}
          <div className="post-header">
            <Link 
              to={`/Posts/${post._id}`} 
              className="post-title"
            >
              {post.title}
            </Link>
            <button className="action-text">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Media Content */}
          {post.media_url && (
            <div className="post-media">
              {post.media_type === "photo" && (
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="post-image"
                />
              )}
              {post.media_type === "video" && (
                <video
                  src={post.media_url}
                  alt={post.title}
                  className="post-image"
                  controls
                  controlsList="nofullscreen"
                />
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="post-text">
            {post.content}
          </div>

          <div className="tags-container">
            {post.tags?.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            )) || null}
          </div>

          {/* User Card */}
          <div className="post-footer">
            <div className="post-actions">
              <ShareDialog postId={post._id} postTitle={post.title} />
              <span style={{border:"none",outline:"none",backgroundColor:"inherit"}} className="action-text">
                {staticTranslator("Share", targetLang)}
              </span>
              <MessageCircle size={16} />
              <span className="action-text">
                {post.comments?.length || 0} {staticTranslator("comments", targetLang)}
              </span>
            </div>
            
            <div className="user-info">
              <img
                src={post.user_id.profilePicture || sampleUser}
                alt="User avatar"
                className="user-avatar"
              />
              <div>
                <Link 
                  to={`/Users/${post.user_id._id}`} 
                  className="user-name"
                >
                  {post.user_id.name}
                </Link>
                <div className="post-date">
                  {staticTranslator("asked", targetLang)} {formatDateWithWeekday(post.created_at)}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentDisplay 
            post={post} 
            setShowAllComments={setShowAllComments} 
            showAllComments={showAllComments} 
          />

          {/* Comment Input */}
          <div className="comments-section">
            <CommentComponent postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
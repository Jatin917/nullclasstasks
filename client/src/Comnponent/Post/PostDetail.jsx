import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import sampleUser from '../../assets/SampleUser.png';
import Leftsidebar from '../Leftsidebar/Leftsidebar';
import CommentComponent from './CommentComponent';
import CommentDisplay from './CommentDisplay';
import LikeComponent from './LikeComponent';
import ShareDialog from './ShareDialog';
import { staticTranslator } from '../../services';
import './postDetail.css'
// import { fetchPost } from '../../action/post';
import { translateData } from '../../action/translator';
import { getPost } from '../../api';
// import { translator } from '../../action/translator';
const PostDetail = ({ slidein }) => {
  const [post, setPost] = useState([]);
  const targetLang = localStorage.getItem("lang");
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

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
  useEffect(()=>{
    const fetchPost = async()=>{
      const { data } = await getPost(id);
      const translatedData = await translateData(targetLang, data.post);
      setPost(translatedData);
    }
    fetchPost();
  },[id, targetLang])

  return (
    <div className="container">
      <Leftsidebar slidein={slidein} />
  
      {/* Main Content Area */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Question Header */}
          <div className="question-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="meta-info">
              <span>{staticTranslator("Asked", targetLang)} {formatDate(post.created_at)}</span>
              <span>{staticTranslator("Viewed", targetLang)} {post.views || 0} {staticTranslator("times", targetLang)}</span>
            </div>
          </div>
  
          {/* Main Grid */}
          <div className="grid-container">
            {/* Voting Column */}
            <div className="voting-column">
              <LikeComponent post={post} isLiked={isLiked} setIsLiked={setIsLiked} />
              <ShareDialog postId={post._id} postTitle={post.title} />
            </div>
  
            {/* Main Content Column */}
            <div className="content-column">
              {/* Post Content */}
              <div className="post-content">
                <div className="text-content">
                  <p>{post.content}</p>
                </div>
  
                {/* Media Content */}
                {post.media_url && (
                  <div className="media-content">
                    {post.media_type === "photo" && (
                     <img
                      src={post.media_url}
                      alt={post.title}
                      className="media-image"
                    />
                    )}
                  {post.media_type === "video" && (
                  <video
                    src={post.media_url}
                    alt={post.title}
                    className="media-image"
                    controls
                    controlsList="nofullscreen"
                  />
                )}
                  </div>
                )}
  
                {/* Tags */}
                <div className="tags-container">
                  {post.tags?.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  )) || null}
                </div>
  
                {/* User Card */}
                <div className="user-card">
                  <div className="user-card-container">
                    <div className="user-meta">
                      {staticTranslator("Asked", targetLang)} {formatDate(post.created_at)}
                    </div>
                    <div className="user-info">
                      <img
                        src={post.user_id?.profilePicture || sampleUser}
                        alt="Profile"
                        className="profile-picture"
                      />
                      <div className="user-name">
                        <span>{post.user_id?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Comments Section */}
              <div className="comments-section">
                <h2 className="comments-header">
                  {post.comments?.length || 0} {staticTranslator("Comments", targetLang)}
                </h2>
                <CommentDisplay post={post} showAllComments={showAllComments} setShowAllComments={setShowAllComments} />
                <div className="comment-input">
                  <CommentComponent postId={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default PostDetail;
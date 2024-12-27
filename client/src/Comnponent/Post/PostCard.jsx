import React, { useEffect, useState } from 'react';
import { Share2, MoreVertical, Send, MessageCircle } from 'lucide-react';
import sampleUser from '../../assets/SampleUser.png'
import LikeComponent from './LikeComponent';
import CommentComponent from './CommentComponent';

const PostCard = ({ post, cardStyles }) => {

  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  function formatDateWithWeekday(isoDate) {
    const date = new Date(isoDate);
  
    const options = {
      weekday: 'long',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
  
    return date.toLocaleDateString('en-US', options);
  }
  if (!post) {
    return <p>No post data available.</p>;
  }

  const displayedComments = showAllComments ? post.comments : post.comments.slice(0, 2);
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <img
            src={post.user_id.profilePicture || sampleUser}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{post.user_id.name}</p>
            <p className="text-xs text-gray-500">{formatDateWithWeekday(post.created_at)}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Media Content */}
      {post.media_url && (
        <div className="relative aspect-video">
          {post.media_type === "photo" ? (
            <img
              src={post.media_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      )}

      {/* Post Content */}
      <div className="p-3">
        <h2 className="text-base font-medium text-gray-900 mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {post.content}
        </p>

        {/* Stats Bar */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{post?.likes?.length} likes</span>
          <div className="space-x-2">
            <span>{post?.comments?.length} comments</span>
            <span>•</span>
            <span>{post.shares?.length || 0} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <LikeComponent isLiked={isLiked} setIsLiked={setIsLiked} postId={post._id} likes={post.likes} />    
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <MessageCircle size={20} className="stroke-2" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
            <Share2 size={20} className="stroke-2" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-4 space-y-3">
          {/* Comments List */}
          <div className="space-y-2">
            {displayedComments.map((comment, index) => (
              <div key={index} className="flex space-x-2">
                <img
                  src={comment.ProfilePicture || sampleUser}
                  alt={`${comment.userName} avatar`}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div className="flex-1 bg-gray-50 rounded-lg p-2">
                  <p className="text-xs font-medium">{comment.user_id.name}</p>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Comments Button */}
          {post.comments.length > 2 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              View all {post.comments.length} comments
            </button>
          )}

          {/* New Comment Input */}
          <CommentComponent postId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
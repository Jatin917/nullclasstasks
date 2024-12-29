import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, MoreVertical, MessageCircle, ChevronUp, ChevronDown, BookmarkPlus } from 'lucide-react';
import sampleUser from '../../assets/SampleUser.png';
import LikeComponent from './LikeComponent';
import CommentComponent from './CommentComponent';
import CommentDisplay from './CommentDisplay';
import ShareDialog from './ShareDialog';

const PostCard = ({ post, cardStyles }) => {
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
    return <p>No post data available.</p>;
  }


  // Wrapper component to style the LikeComponent to match StackOverflow UI
  const StyledLikeButtons = () => (
    <div className="flex flex-col items-center">
      <LikeComponent
        post={post}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        showCount
        countClassName="text-lg font-medium my-2"
      />
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="grid grid-cols-12 gap-4">
        {/* Vote Column */}
        <div className="w-[70px] col-span-1 pt-6 flex flex-col items-center border-r border-gray-100 bg-gray-50">
          <StyledLikeButtons />
          <button className="p-1 mt-4 hover:bg-gray-200 rounded text-gray-500">
            <BookmarkPlus size={20} />
          </button>
        </div>

        {/* Main Content Column */}
        <div className="col-span-11 p-4">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <Link to={`/Posts/${post._id}`} className="text-xl font-medium text-gray-900 hover:text-blue-600">
              {post.title}
            </Link>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Media Content */}
          {post.media_url && (
            <div className="mb-4">
              {post.media_type === "photo" && (
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="max-h-96 object-contain"
                />
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="text-gray-600 mb-4">
            {post.content}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">
                {tag}
              </span>
            )) || null}
          </div>

          {/* User Card */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <div className="flex items-center gap-2">
            <ShareDialog postId={post._id} postTitle={post.title} />
              <span className="text-gray-500">Share</span>
              <MessageCircle size={16} className="ml-4 text-gray-500" />
              <span className="text-gray-500">{post.comments?.length || 0} comments</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
              <img
                src={post.user_id.profilePicture || sampleUser}
                alt="User avatar"
                className="w-8 h-8 rounded"
              />
              <div>
                <Link to={`/Users/${post.user_id._id}`} className="text-blue-600 hover:text-blue-800">
                  {post.user_id.name}
                </Link>
                <div className="text-xs text-gray-500">
                  asked {formatDateWithWeekday(post.created_at)}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {/* {post.comments?.length > 0 && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="space-y-3">
                {displayedComments.map((comment, index) => (
                  <div key={index} className="flex gap-3 text-sm border-b border-gray-100 pb-3">
                    <img
                      src={comment.user_id.profilePicture || sampleUser}
                      alt={`${comment.user_id.name} avatar`}
                      className="w-6 h-6 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-gray-600">{comment.content}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        - {comment.user_id.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {post.comments.length > 2 && !showAllComments && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                >
                  Show {post.comments.length - 2} more comments
                </button>
              )}
            </div>
          )} */}
          <CommentDisplay post={post} setShowAllComments={setShowAllComments} showAllComments={showAllComments} />

          {/* Comment Input */}
          <div className="mt-4">
            <CommentComponent postId={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Share2, } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sampleUser from '../../assets/SampleUser.png';
import Leftsidebar from '../Leftsidebar/Leftsidebar';
import CommentComponent from './CommentComponent';
import CommentDisplay from './CommentDisplay';
import LikeComponent from './LikeComponent';
import ShareDialog from './ShareDialog';

const PostDetail = ({ slidein }) => {
  const { id } = useParams();
  const posts = useSelector((state) => state.translatedDataReducer);
  const post = posts.filter((p) => p._id === id)[0];
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = () => setIsLiked(!isLiked);


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

  return (
    <div className="flex min-h-[calc(100vh-100px)] max-w-[1250px] mx-auto">
      <Leftsidebar slidein={slidein} />

      {/* Main Content Area */}
      <div className="flex-1 mt-[60px] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Question Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Asked {formatDate(post.created_at)}</span>
              <span>Viewed {post.views || 0} times</span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Voting Column */}
            <div className="col-span-1 flex flex-col items-center pt-2">
              <LikeComponent post={post} isLiked={isLiked} setIsLiked={setIsLiked} />
              <ShareDialog postId={post._id} postTitle={post.title} />
            </div>

            {/* Main Content Column */}
            <div className="col-span-11">
              {/* Post Content */}
              <div className="mb-6">
                <div className="prose max-w-none mb-4">
                  <p className="text-gray-800">{post.content}</p>
                </div>
                
                {/* Media Content */}
                {post.media_url && (
                  <div className="my-4 border rounded-lg overflow-hidden">
                    <img
                      src={post.media_url}
                      alt={post.title}
                      className="w-full h-auto max-h-[500px] object-contain bg-gray-50"
                    />
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 mt-6">
                  {post.tags?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">
                      {tag}
                    </span>
                  )) || null}
                </div>

                {/* User Card */}
                <div className="flex justify-end mt-8">
                  <div className="bg-blue-50 px-4 py-2 rounded w-48">
                    <div className="text-xs text-gray-600 mb-2">
                      Asked {formatDate(post.created_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={post.user_id?.profilePicture || sampleUser}
                        alt="Profile"
                        className="w-8 h-8 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-blue-600">
                          {post.user_id?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-medium mb-4">
                  {post.comments?.length || 0} Comments
                </h2>
                <CommentDisplay post={post} showAllComments={showAllComments} setShowAllComments={setShowAllComments}/>
                <div className="mt-4">
                  <CommentComponent postId={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Right Sidebar */}
      <div className="hidden xl:block w-64 mt-[60px] p-4 border-l border-gray-200">
        <div className="sticky top-[60px]">
          <h3 className="text-sm font-medium mb-2">Related Questions</h3>
          {/* Add related questions here */}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark,Heart, MessageCircle, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sampleUser from '../../assets/SampleUser.png'
import Leftsidebar from '../Leftsidebar/Leftsidebar';

const PostDetail = ({slidein}) => {
    const { id } = useParams()
    const posts = useSelector((state)=>state.postReducer);
    const post = posts.filter((p)=>p._id===id)[0]
    const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => setIsLiked(!isLiked);
  const handleSave = () => setIsSaved(!isSaved);
  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }}
    return (
        <div className="flex min-h-[calc(100vh-100px)] max-w-[1250px] mx-auto bg-white">
          <Leftsidebar slidein={slidein} />
          
          <div className="flex-1 grid md:grid-cols-[3fr,2fr] mt-[100px]">
            {/* Left: Image Section */}
            <div className="bg-black flex items-center">
              {post.media_url && (
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="w-full h-auto object-contain max-h-[80vh]"
                />
              )}
            </div>
    
            {/* Right: Content Section */}
            <div className="flex flex-col h-full border-l border-gray-200">
              {/* Post Header */}
              <div className="flex items-center p-4 border-b border-gray-200">
                <img
                  src={post.user_id?.profilePicture || sampleUser}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="font-medium text-sm">{post.user_id?.name}</span>
              </div>
    
              {/* Comments Section */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Original Post */}
                <div className="flex gap-3 mb-4">
                  <img
                    src={post.user_id?.profilePicture || sampleUser}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="font-medium text-sm mr-2">{post.user_id?.name}</span>
                    <span className="text-sm">{post.content}</span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
    
                {/* Comments */}
                {post.comments?.map((comment) => (
                  <div key={comment._id} className="flex gap-3 mb-4">
                    <img
                      src={comment.user_id.profilePicture || sampleUser}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="font-medium text-sm mr-2">{comment.user_id.name}</span>
                      <span className="text-sm">{comment.content}</span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
    
              {/* Actions Section */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between mb-4">
                  <div className="flex gap-4">
                    <button onClick={handleLike}>
                      <Heart 
                        size={24} 
                        className={`${isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-gray-700'}`}
                      />
                    </button>
                    <button>
                      <MessageCircle size={24} className="stroke-gray-700" />
                    </button>
                    <button>
                      <Share2 size={24} className="stroke-gray-700" />
                    </button>
                  </div>
                  <button onClick={handleSave}>
                    <Bookmark 
                      size={24} 
                      className={`${isSaved ? 'fill-black stroke-black' : 'stroke-gray-700'}`}
                    />
                  </button>
                </div>
                
                <p className="font-medium text-sm mb-1">{post.likes?.length || 0} likes</p>
                <p className="text-xs text-gray-500 mb-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
    
                {/* Add Comment */}
                <form onSubmit={handleAddComment} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 text-sm p-2 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!newComment.trim()}
                    className="text-blue-500 font-medium text-sm disabled:opacity-50"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};
export default PostDetail;
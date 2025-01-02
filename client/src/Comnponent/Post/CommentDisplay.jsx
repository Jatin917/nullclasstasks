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
  return (
    <>
      {post.comments.length && post.comments.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="space-y-3">
            {displayedComments.map((comment, index) => (
              <div
                key={index}
                className="flex gap-3 text-sm border-b border-gray-100 pb-3"
              >
                <img
                  src={comment.user_id.profilePicture || sampleUser}
                  alt={`${comment.user_id.name} avatar`}
                  className="w-6 h-6 rounded"
                />
                <div className="flex-1">
                <div className="text-sm text-gray-800">{comment.content}</div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-blue-600">{comment.user_id.name}</span>
                    <span className="text-xs text-gray-500">
                    {staticTranslator('commented', targetLang)} {formatDate(comment.created_at)}
                    </span>
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
              {staticTranslator('Show', targetLang)} {post.comments.length - 2} {staticTranslator('more comments', targetLang)}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CommentDisplay;

import React, { useState, useEffect, useRef } from 'react';
import { Share2, Copy, Facebook, X } from 'lucide-react';

const ShareDialog = ({ postId, postTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);

  // Generate the share URL
  const shareUrl = `${window.location.origin}/Posts/${postId}`;

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Social media share URLs
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded text-gray-500"
        title="Share this post"
      >
        <Share2 size={24} />
      </button>

      {/* Share Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={dialogRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-4"
          >
            {/* Dialog Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Share</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Copy Link Section */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 border rounded-md px-3 py-2 text-sm bg-gray-50"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded text-white text-sm flex items-center ${
                    copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <Copy size={16} className="mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Share Options */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => window.open(twitterShareUrl, '_blank')}
                className="flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                <X size={16} className="mr-2" />
                X
              </button>
              <button
                onClick={() => window.open(facebookShareUrl, '_blank')}
                className="flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
              >
                <Facebook size={16} className="mr-2" />
                Facebook
              </button>
            </div>

            {/* Share Tips */}
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium mb-2">Share a link to this post</h4>
              <ul className="space-y-1 list-disc pl-4">
                <li>Copy link to clipboard</li>
                <li>Share on social media</li>
                <li>The link will redirect to this specific post</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareDialog;
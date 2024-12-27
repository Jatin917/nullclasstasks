import React, { useState } from 'react';
import { ImagePlus, VideoIcon, X } from 'lucide-react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import { useDispatch } from 'react-redux';
import { createPost } from '../../action/post';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({slidein}) => {
    const [mediaType, setMediaType] = useState('photo');
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleMediaChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMedia(file);
        setPreview(URL.createObjectURL(file));
      }
    };
    function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("media_type", mediaType);
        formData.append("media", media); // This will send the file

        // Dispatch the action or make an API call
        dispatch(createPost(formData, navigate));
        setContent('');
        setMedia(null)
        setTitle('')
        setMediaType('photo')
    }
  return (
    <div className="flex min-h-[calc(100vh-100px)] max-w-[1250px] mx-auto">
      <Leftsidebar slidein={slidein} />
      <div className="flex-1 max-w-2xl mx-auto mt-[100px] p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Create a Post</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows="4"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <div className="flex gap-4 border-b border-gray-200 pb-4">
                <button
                  type="button"
                  onClick={() => setMediaType('photo')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    mediaType === 'photo' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <ImagePlus size={20} />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    mediaType === 'video' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <VideoIcon size={20} />
                  <span>Video</span>
                </button>
              </div>

              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <label className="flex flex-col items-center cursor-pointer">
                    {mediaType === 'photo' ? <ImagePlus className="w-12 h-12 text-gray-400" /> : <VideoIcon className="w-12 h-12 text-gray-400" />}
                    <span className="mt-2 text-sm text-gray-500">Upload {mediaType === 'photo' ? 'an image' : 'a video'}</span>
                    <input
                      type="file"
                      accept={mediaType === 'photo' ? 'image/*' : 'video/*'}
                      className="hidden"
                      onChange={handleMediaChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="relative">
                  {mediaType === 'photo' ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={preview}
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMedia(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full text-white hover:bg-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default CreatePost;
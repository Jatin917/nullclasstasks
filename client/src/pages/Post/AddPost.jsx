import React, { useState } from 'react';
import { ImagePlus, VideoIcon, X } from 'lucide-react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import { useDispatch } from 'react-redux';
import { createPost } from '../../action/post';
import { useNavigate } from 'react-router-dom';
import './addPost.css'
import { staticTranslator } from '../../services';

const CreatePost = ({slidein}) => {
  const targetLang = localStorage.getItem("lang") || "";
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
        formData.append("media", media); 

        dispatch(createPost(formData, navigate));
        setContent('');
        setMedia(null)
        setTitle('')
        setMediaType('photo')
    }
    return (
      <div className="container">
        <Leftsidebar slidein={slidein} />
        <div className="main-content">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">{staticTranslator("Create a Post", targetLang)}</h2>
              <form onSubmit={handleSubmit} className="form">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={staticTranslator("Title", targetLang)}
                  className="input"
                />
    
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={staticTranslator("What's on your mind?", targetLang)}
                  rows="4"
                  className="textarea"
                ></textarea>
    
                <div className="media-buttons">
                  <button
                    type="button"
                    onClick={() => setMediaType("photo")}
                    className={`media-button ${
                      mediaType === "photo" ? "media-button-active" : ""
                    }`}
                  >
                    <ImagePlus size={20} />
                    <span>{staticTranslator("Photo", targetLang)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType("video")}
                    className={`media-button ${
                      mediaType === "video" ? "media-button-active" : ""
                    }`}
                  >
                    <VideoIcon size={20} />
                    <span>Video</span>
                  </button>
                </div>
    
                {!preview ? (
                  <div className="upload-container">
                    <label className="upload-label">
                      {mediaType === "photo" ? (
                        <ImagePlus className="upload-icon" />
                      ) : (
                        <VideoIcon className="upload-icon" />
                      )}
                      <span>{staticTranslator("Upload", targetLang)} {mediaType === "photo" ? "an image" : "a video"}</span>
                      <input
                        type="file"
                        accept={mediaType === "photo" ? "image/*" : "video/*"}
                        className="hidden"
                        onChange={handleMediaChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    {mediaType === "photo" ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="preview-image"
                      />
                    ) : (
                      <video
                        src={preview}
                        controls
                        className="preview-video"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMedia(null);
                        setPreview(null);
                      }}
                      className="remove-button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
    
                <button type="submit" className="submit-button">
                  {staticTranslator("Post", targetLang)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    
};

export default CreatePost;
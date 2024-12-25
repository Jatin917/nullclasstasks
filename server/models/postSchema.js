import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title:{
      type:String,
      trim:true,
      required:true
    },
    content: {
      type: String,
      trim: true,
      default: ''
    },
    media_type: {
      type: String,
      enum: ['photo', 'video', 'none'],
      default: 'none'
    },
    media_url: {
      type: String,
      default: null
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    shares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        content: {
          type: String,
          required: true,
          trim: true
        },
        created_at: {
          type: Date,
          default: Date.now
        }
      }
    ],
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });
  
  export default mongoose.model('Post', PostSchema);
  
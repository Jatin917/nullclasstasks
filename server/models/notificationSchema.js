import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'share', 'friend_request'],
      required: true
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      default: null
    },
    initiator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    is_read: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  
  export default mongoose.model('Notification', NotificationSchema);
  
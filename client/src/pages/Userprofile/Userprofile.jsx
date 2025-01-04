import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlus, UserMinus, X } from 'lucide-react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import sampleUser from '../../assets/SampleUser.png'
import { acceptReq, cancelReq, rejectReq, sendReq, unfriendReq } from '../../action/friendShip';
import { staticTranslator } from '../../services';
import './Userprofile.css'

const Userprofile = ({slidein}) => {
  const targetLang = localStorage.getItem("lang");
  const isAuthenticated = !!(JSON.parse(localStorage.getItem('Profile'))?.token);
  const { id } = useParams();
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  
  const users = useSelector((state) => state.translatedUsersDataReducer);
  const currentprofile = users.filter((user) => user._id === id)[0];
  const currentuser = useSelector((state) => state?.currentuserreducer?.result);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOwnProfile = currentprofile?._id === currentuser?._id;
  function checkFriendShipStatus(arr, id){
    if(!arr || !id) return false;
    for(let i = 0;i<arr.length;i++){
      if(arr[i]._id===id){
        return true;
      }
    }
    return false;
  }
  const isFriend = checkFriendShipStatus(currentprofile?.friends, currentuser?._id);
  const hasSentRequest = checkFriendShipStatus(currentprofile?.friend_requests_sent, currentuser?._id);
  const hasReceivedRequest = checkFriendShipStatus(currentprofile?.friend_requests_pending, currentuser?._id);

  const handleSendRequest = () => {
    if(!isAuthenticated){
      alert(staticTranslator("Please Login or Signup first", targetLang));
      navigate('/auth');
    }
    dispatch(sendReq(currentprofile?._id));
    console.log('Sending friend request to:', currentprofile?._id);
  };

  const handleAcceptRequest = (userId) => {
    if(!isAuthenticated){
      alert(staticTranslator("Please Login or Signup first", targetLang));
      navigate('/auth');
    }
    dispatch(acceptReq(userId));
    setShowPendingModal(false);
    console.log('Accepting request from:', userId);
  };
  
  const handleRejectRequest = (userId) => {
    if(!isAuthenticated){
      alert(staticTranslator("Please Login or Signup first", targetLang));
      navigate('/auth');
    }
    dispatch(rejectReq(userId));
    setShowPendingModal(false);
    console.log('Rejecting request from:', userId);
  };

  const handleCancelRequest = (userId) => {
    if(!isAuthenticated){
      alert(staticTranslator("Please Login or Signup first", targetLang));
      navigate('/auth');
    }
    dispatch(cancelReq(userId));
    setShowSentModal(false);
    console.log('Canceling request to:', userId);
  };

  const handleUnfriend = (userId) => {
    if(!isAuthenticated){
      alert(staticTranslator("Please Login or Signup first", targetLang));
      navigate('/auth');
    }
    dispatch(unfriendReq(userId));
    setShowFriendsModal(false)
    console.log('Unfriending:', userId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <div className="orange-divider" />
  
        <div className="profile-container">
          <div className="profile-header">
            <img
              src={currentprofile?.profilePicture || sampleUser}
              alt={currentprofile?.name}
              className="profile-image"
            />
            <div className="profile-info">
              <div className="profile-name-section">
                <h1 className="profile-name">{currentprofile?.name}</h1>
                {!isOwnProfile && (
                  <div className="friend-actions">
                    {!isFriend && !hasSentRequest && !hasReceivedRequest && (
                      <button 
                        onClick={handleSendRequest}
                        className="friend-request-btn"
                      >
                        <UserPlus size={16} />
                        {staticTranslator("Send Friend Request", targetLang)}
                      </button>
                    )}
                    {hasSentRequest && (
                      <button 
                        onClick={() => handleCancelRequest(currentprofile?._id)}
                        className="cancel-request-btn"
                      >
                        <UserMinus size={16} />
                        {staticTranslator("Cancel Request", targetLang)}
                      </button>
                    )}
                    {hasReceivedRequest && (
                      <div className="received-request-actions">
                        <button 
                          onClick={() => handleCancelRequest(currentprofile?._id)}
                          className="cancel-request-btn"
                        >
                          {staticTranslator("Cancel Request", targetLang)}
                        </button>
                      </div>
                    )}
                    {isFriend && (
                      <button 
                        onClick={() => handleUnfriend(currentprofile?._id)}
                        className="unfriend-btn"
                      >
                        <UserMinus size={16} />
                        {staticTranslator("Unfriend", targetLang)}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="member-since">
                <span>🎂</span>
                <span>{staticTranslator("Member since", targetLang)} {formatDate(currentprofile?.joinedon)}</span>
              </div>
            </div>
          </div>
  
          <div className="profile-grid">
            <div className="profile-card">
              <div className="card-header">
                <h3>{staticTranslator("Connections", targetLang)}</h3>
              </div>
              <div className="card-content">
                {isOwnProfile && (
                  <>
                    <div 
                      className="connection-item"
                      onClick={() => setShowPendingModal(true)}
                    >
                      <div className="connection-label">
                        <span>➕</span>
                        <span>{staticTranslator("Pending Requests", targetLang)}</span>
                      </div>
                      <span>{currentprofile?.friend_requests_pending?.length || 0}</span>
                    </div>
                    <div 
                      className="connection-item"
                      onClick={() => setShowSentModal(true)}
                    >
                      <div className="connection-label">
                        <span>➖</span>
                        <span>{staticTranslator("Sent Requests", targetLang)}</span>
                      </div>
                      <span>{currentprofile?.friend_requests_sent?.length || 0}</span>
                    </div>
                  </>
                )}
                <div 
                  className="connection-item"
                  onClick={() => setShowFriendsModal(true)}
                >
                  <div className="connection-label">
                    <span>👥</span>
                    <span>{staticTranslator("Friends", targetLang)}</span>
                  </div>
                  <span>{currentprofile?.friends?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="card-header">
                <h3>{staticTranslator("Activity", targetLang)}</h3>
              </div>
              <div className="card-content">
                <div className="activity-header" style={{display:"flex", justifyContent:"space-between"}}>
                  <div className="activity-label">
                    <span>🔖</span>
                    <span>{staticTranslator("Posts", targetLang)}</span>
                  </div>
                  <span>{currentprofile?.posts?.length || 0}</span>
                </div>
                <div className="posts-list" style={{fontSize:"medium", color:"blue", display:"flex", flexDirection:"column", gap:"2px", marginTop:"10px"}}>
                  {currentprofile?.posts?.map((post) => (
                    <Link
                      key={post._id}
                      to={`/posts/${post._id}`}
                      className="post-link"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(showPendingModal || showSentModal || showFriendsModal) && (
        <div className="modal-overlay" onClick={() => {
          setShowPendingModal(false);
          setShowSentModal(false);
          setShowFriendsModal(false);
        }}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            {showPendingModal && (
              <>
                <div className="modal-header">
                  <h3>{staticTranslator("Pending Friend Requests", targetLang)}</h3>
                  <button 
                    className="close-button"
                    onClick={() => setShowPendingModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-content">
                  {currentprofile?.friend_requests_pending?.map((request) => (
                    <div key={request._id} className="request-item">
                      <Link to={`/Users/${request._id}`}  className="user-info">
                        <img
                          src={request.profilePicture || sampleUser}
                          alt={request.name}
                          className="user-avatar"
                        />
                        <span className="user-name">{request.name}</span>
                      </Link>
                      <div className="request-actions">
                        <button 
                          className="accept-btn"
                          onClick={() => handleAcceptRequest(request._id)}
                        >
                          {staticTranslator("Accept", targetLang)}
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleRejectRequest(request._id)}
                        >
                          {staticTranslator("Reject", targetLang)}
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!currentprofile?.friend_requests_pending?.length) && (
                    <p className="no-content">{staticTranslator("No pending requests", targetLang)}</p>
                  )}
                </div>
              </>
            )}

            {showSentModal && (
  <div 
    className="modal-container"
    onClick={e => e.stopPropagation()}
  >
    <div className="modal-header">
      <h3>{staticTranslator("Sent Friend Requests", targetLang)}</h3>
      <button 
        className="close-button"
        onClick={() => setShowSentModal(false)}
      >
        <X size={20} />
      </button>
    </div>
    <div className="modal-content">
      {currentprofile?.friend_requests_sent?.map((request) => (
        <div key={request._id} className="request-item">
          <Link to={`/Users/${request._id}`} className="user-info">
            <img
              src={request.profilePicture || sampleUser}
              alt={request.name}
              className="user-avatar"
            />
            <span className="user-name">{request.name}</span>
          </Link>
          <button 
            className="reject-btn"
            onClick={() => handleCancelRequest(request._id)}
          >
            {staticTranslator("Cancel", targetLang)}
          </button>
        </div>
      ))}
      {(!currentprofile?.friend_requests_sent?.length) && (
        <p className="no-content">{staticTranslator("No sent requests", targetLang)}</p>
      )}
    </div>
  </div>
)}

{showFriendsModal && (
  <div 
    className="modal-container"
    onClick={e => e.stopPropagation()}
  >
    <div className="modal-header">
      <h3>{staticTranslator("Friends", targetLang)}</h3>
      <button 
        className="close-button"
        onClick={() => setShowFriendsModal(false)}
      >
        <X size={20} />
      </button>
    </div>
    <div className="modal-content">
      {currentprofile?.friends?.map((friend) => (
        <div key={friend._id} className="request-item">
          <Link className="user-info" to={`/Users/${friend._id}`} >
            <img
              src={friend.profilePicture || sampleUser}
              alt={friend.name}
              className="user-avatar"
            />
            <span className="user-name">{friend.name}</span>
          </Link>
          {isOwnProfile && (
            <button 
              className="reject-btn"
              onClick={() => handleUnfriend(friend._id)}
            >
              {staticTranslator("Unfriend", targetLang)}
            </button>
          )}
        </div>
      ))}
      {(!currentprofile?.friends?.length) && (
        <p className="no-content">{staticTranslator("No friends yet", targetLang)}</p>
      )}
    </div>
  </div>
)}
        </div>
        </div>
      )}
    </div>
  );
};

export default Userprofile;
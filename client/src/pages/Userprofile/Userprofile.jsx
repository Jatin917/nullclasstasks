import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlus, UserMinus, X, FlaskRound } from 'lucide-react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import sampleUser from '../../assets/SampleUser.png'
import { acceptReq, cancelReq, rejectReq, sendReq, unfriendReq } from '../../action/friendShip';
import { staticTranslator } from '../../services';

const Userprofile = () => {
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
    <div className="profile-container flex min-h-[calc(100vh-100px)] max-w-[1250px] mx-auto">
      <Leftsidebar slidein={true} />
      <div className="profile-content mt-[60px] w-[100%]">
        <div className="h-1 bg-orange-500" />
  
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex items-start gap-6 mb-8">
            <img
              src={currentprofile?.profilePicture || sampleUser}
              alt={currentprofile?.name}
              className="w-32 h-32 rounded-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold">{currentprofile?.name}</h1>
                {!isOwnProfile && (
                  <div className="flex gap-2">
                    {!isFriend && !hasSentRequest && !hasReceivedRequest && (
                      <button 
                        onClick={handleSendRequest}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded border border-blue-600"
                      >
                        <UserPlus size={16} />
                        {staticTranslator("Send Friend Request", targetLang)}
                      </button>
                    )}
                    {hasSentRequest && (
                      <button 
                        onClick={() => handleCancelRequest(currentprofile?._id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 bg-transparent hover:bg-blue-50 rounded border border-blue-600"
                      >
                        <UserMinus size={16} />
                        {staticTranslator("Cancel Request", targetLang)}
                      </button>
                    )}
                    {hasReceivedRequest && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleCancelRequest(currentprofile?._id)}
                          className="px-3 py-1.5 text-sm text-blue-600 bg-transparent hover:bg-blue-50 rounded border border-blue-600"
                        >
                          {staticTranslator("Cancel Request", targetLang)}
                        </button>
                      </div>
                    )}
                    {isFriend && (
                      <button 
                        onClick={() => handleUnfriend(currentprofile?._id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 bg-transparent hover:bg-blue-50 rounded border border-blue-600"
                      >
                        <UserMinus size={16} />
                        {staticTranslator("Unfriend", targetLang)}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>🎂</span>
                <span>{staticTranslator("Member since", targetLang)} {formatDate(currentprofile?.joinedon)}</span>
              </div>
            </div>
          </div>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-md border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">{staticTranslator("Connections", targetLang)}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {isOwnProfile && (
                  <>
                    <div 
                      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setShowPendingModal(true)}
                    >
                      <div className="flex items-center gap-2">
                        <span>➕</span>
                        <span>{staticTranslator("Pending Requests", targetLang)}</span>
                      </div>
                      <span>{currentprofile?.friend_requests_pending?.length || 0}</span>
                    </div>
                    <div 
                      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setShowSentModal(true)}
                    >
                      <div className="flex items-center gap-2">
                        <span>➖</span>
                        <span>{staticTranslator("Sent Requests", targetLang)}</span>
                      </div>
                      <span>{currentprofile?.friend_requests_sent?.length || 0}</span>
                    </div>
                  </>
                )}
                <div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShowFriendsModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>{staticTranslator("Friends", targetLang)}</span>
                  </div>
                  <span>{currentprofile?.friends?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">{staticTranslator("Activity", targetLang)}</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span>🔖</span>
                    <span>{staticTranslator("Posts", targetLang)}</span>
                  </div>
                  <span>{currentprofile?.posts?.length || 0}</span>
                </div>
                <div className="space-y-2">
                  {currentprofile?.posts?.map((post) => (
                    <Link
                      key={post._id}
                      to={`/posts/${post.id}`}
                      className="block text-blue-600 hover:text-blue-800 hover:underline"
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

      {/* Modal Overlay */}
      {(showPendingModal || showSentModal || showFriendsModal) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => {
            setShowPendingModal(false);
            setShowSentModal(false);
            setShowFriendsModal(false);
          }}
        >
          {/* Pending Requests Modal */}
          {showPendingModal && (
            <div 
              className="bg-white rounded-md max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">{staticTranslator("Pending Friend Requests", targetLang)}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPendingModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {currentprofile?.friend_requests_pending?.map((request) => (
                  <div key={request._id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={request.profilePicture || sampleUser}
                        alt={request.name}
                        className="w-8 h-8 rounded"
                      />
                      <span className="font-medium">{request.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        {staticTranslator("Accept", targetLang)}
                      </button>
                      <button 
                        className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
                        onClick={() => handleRejectRequest(request._id)}
                      >
                        {staticTranslator("Reject", targetLang)}
                      </button>
                    </div>
                  </div>
                ))}
                {(!currentprofile?.friend_requests_pending?.length) && (
                  <p className="text-center text-gray-500 py-8">{staticTranslator("No pending requests", targetLang)}</p>
                )}
              </div>
            </div>
          )}

          {/* Sent Requests Modal */}
          {showSentModal && (
            <div 
              className="bg-white rounded-md max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">{staticTranslator("Sent Friend Requests", targetLang)}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowSentModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {currentprofile?.friend_requests_sent?.map((request) => (
                  <div key={request._id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={request.profilePicture || sampleUser}
                        alt={request.name}
                        className="w-8 h-8 rounded"
                      />
                      <span className="font-medium">{request.name}</span>
                    </div>
                    <button 
                      className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
                      onClick={() => handleCancelRequest(request._id)}
                    >
                      {staticTranslator("Cancel", targetLang)}
                    </button>
                  </div>
                ))}
                {(!currentprofile?.friend_requests_sent?.length) && (
                  <p className="text-center text-gray-500 py-8">{staticTranslator("No sent requests", targetLang)}</p>
                )}
              </div>
            </div>
          )}

          {/* Friends Modal */}
          {showFriendsModal && (
            <div 
              className="bg-white rounded-md max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">{staticTranslator("Friends", targetLang)}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowFriendsModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {currentprofile?.friends?.map((friend) => (
                  <div key={friend._id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.profilePicture || sampleUser}
                        alt={friend.name}
                        className="w-8 h-8 rounded"
                      />
                      <span className="font-medium">{friend.name}</span>
                    </div>
                    {isOwnProfile && (
                      <button 
                        className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
                        onClick={() => handleUnfriend(friend._id)}
                      >
                        {staticTranslator("Unfriend", targetLang)}
                      </button>
                    )}
                  </div>
                ))}
                {(!currentprofile?.friends?.length) && (
                  <p className="text-center text-gray-500 py-8">{staticTranslator("No friends yet", targetLang)}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Userprofile;
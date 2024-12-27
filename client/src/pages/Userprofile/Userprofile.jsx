import React, { useState } from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Avatar from '../../Comnponent/Avatar/Avatar'
import Editprofileform from './Edirprofileform'
import Profilebio from './Profilebio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import { Home, Globe, Star, Users, Bookmark, Cake, Mail, UserPlus, UserMinus } from 'lucide-react';

const Userprofile = ({ slidein }) => {
  const { id } = useParams()
  const [Switch, setswitch] = useState(false);

  const users = useSelector((state)=>state.usersreducer)
  const currentprofile = users.filter((user) => user._id === id)[0]
  console.log(currentprofile);
  const currentuser = useSelector((state)=>state.currentuserreducer)
  // console.log(currentuser._id)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return (
    <div className="profile-container">
      <Leftsidebar slidein={true} />
      <div className="profile-content">
        {/* Header Section with Orange Bar */}
        <div className="orange-bar" />
  
        {/* Profile Container */}
        <div className="profile-main">
          {/* Profile Header */}
          <div className="profile-header">
            <img
              src={currentprofile?.profilePicture || "/api/placeholder/128/128"}
              alt={currentprofile?.name}
              className="profile-picture"
            />
            <div className="profile-details">
              <h1 className="profile-name">{currentprofile?.name}</h1>
              <div className="profile-meta">
                <div className="profile-meta-item">
                  <span className="icon">📧</span>
                  <span>{currentprofile?.email}</span>
                </div>
                <div className="profile-meta-item">
                  <span className="icon">🎂</span>
                  <span>Member since {formatDate(currentprofile?.joinedon)}</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Stats Cards */}
          <div className="stats-cards">
            {/* Connections Card */}
            <div className="stats-card">
              <div className="stats-card-header">
                <h3>Connections</h3>
              </div>
              <div className="stats-card-body">
                <div className="stats-item">
                  <span className="icon">➕</span>
                  <span>Pending Requests</span>
                  <span>{currentprofile?.friend_requests_pending?.length || 0}</span>
                </div>
                <div className="stats-item">
                  <span className="icon">➖</span>
                  <span>Sent Requests</span>
                  <span>{currentprofile?.friend_requests_sent?.length || 0}</span>
                </div>
                <div className="stats-item">
                  <span className="icon">👥</span>
                  <span>Friends</span>
                  <span>{currentprofile?.friends?.length || 0}</span>
                </div>
              </div>
            </div>
  
            {/* Activity Card */}
            <div className="stats-card">
              <div className="stats-card-header">
                <h3>Activity</h3>
              </div>
              <div className="stats-card-body">
                <div className="stats-item">
                  <span className="icon">🔖</span>
                  <span>Posts</span>
                  <span>{currentprofile?.posts?.length || 0}</span>
                </div>
                {/* Posts List */}
                <div className="mt-4">
                  {currentprofile?.posts?.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="block py-2 text-blue-600 hover:text-blue-800 hover:underline"
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
    </div>
  );
  
};
export default Userprofile
import React from 'react';
import { Chrome } from 'lucide-react';
import { authenticationPopup, authenticationRedirect } from '../../firebase/firebasePopup';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../../action/auth';
import { useNavigate } from 'react-router-dom';

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleGoogleAuth() {
    try {
      if (window.innerWidth <= 768) {
        await authenticationRedirect();
      } else {
        await authenticationPopup();
      }
      await dispatch(googleAuth(navigate));
    } catch (error) {
      console.error("Google Authentication failed:", error);
    }
  }
  
  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center justify-center w-full max-w-sm px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      <Chrome className="w-5 h-5 mr-3 text-blue-500" />
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
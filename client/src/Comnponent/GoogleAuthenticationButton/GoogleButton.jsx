import React from 'react';
import { Chrome } from 'lucide-react';
import { authenticationPopup, authenticationRedirect } from '../../firebase/firebasePopup';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../../action/auth';
import { useNavigate } from 'react-router-dom';
import { staticTranslator } from '../../services';

const GoogleAuthButton = () => {
  const targetLang = localStorage.getItem("lang") || "en";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chromeIconStyle = {
    width: "1.25rem",
    height: "1.25rem",
    marginRight: "0.75rem",
    color: "#3b82f6",
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "20rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#4b5563", 
    backgroundColor: "#ffffff", 
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem", 
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "background-color 0.2s, color 0.2s",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#f9fafb", 
  };

  const buttonFocusStyle = {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)", 
  };

  // const isMobile = () => window.innerWidth <= 768;

  async function handleGoogleAuth() {
    try {
      // if (isMobile()) {
      //   await authenticationRedirect();
      // } else {
      // }
      await authenticationPopup();
      await dispatch(googleAuth(navigate));
    } catch (error) {
      console.error("Google Authentication failed:", error);
      alert(staticTranslator('Authentication failed. Please try again.', targetLang));
    }
  }

  return (
    <button
      onClick={handleGoogleAuth}
      style={buttonStyle}
      onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
      onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
      onFocus={(e) => Object.assign(e.target.style, buttonFocusStyle)}
      onBlur={(e) => Object.assign(e.target.style, buttonStyle)}
      aria-label={staticTranslator('Continue with Google', targetLang)}
    >
      <Chrome style={chromeIconStyle} />
      {staticTranslator('Continue with Google', targetLang)}
    </button>
  );
};

export default GoogleAuthButton;

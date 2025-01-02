import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bars from "../../assets/bars-solid.svg";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import "./navbar.css";
import { setcurrentuser } from "../../action/currentuser";
import {jwtDecode} from "jwt-decode";
import sampleUser from "../../assets/SampleUser.png";
import { staticTranslator } from "../../services";
import LanguageVerificationModal from "./LanguageVerificationModal";
import { otpEmailVerification } from "../../api";

function Navbar({ handleslidein, targetLang, setTargetLang }) {
  const languages = {
    hi: "Hindi",
    en: "English",
    fr: "French",
    pt: "Portuguese",
    zh: "Chinese",
    es: "Spanish",
  };

  const User = useSelector((state) => state.currentuserreducer);
  const currentuser = useSelector((state) => state?.currentuserreducer?.result);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setcurrentuser(null));
  };
  useEffect(()=>{
    const lang = localStorage.getItem("lang");
    if(lang) setTargetLang(lang);
  },[])

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedtoken = jwtDecode(token);
      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        // alert("Your session expired Please login again")
        handlelogout();
      }
    }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  const handleLanguageChange = (e) => {
    localStorage.setItem("lang", pendingLanguage);
    setTargetLang(pendingLanguage);
    setPendingLanguage(null);
  };

  return (
    <>
      <nav className="main-nav">
        <div className="navbar">
          <button className="slide-in-icon" onClick={() => handleslidein()}>
            <img src={bars} alt="bars" width="15" />
          </button>
          <div className="navbar-1">
            <Link to="/" className="nav-item nav-logo">
              <img src={logo} alt="logo" />
            </Link>
            <Link to="/" className="nav-item nav-btn res-nav">
              {staticTranslator('About', targetLang)}
            </Link>
            <Link to="/" className="nav-item nav-btn res-nav">
              {staticTranslator('Products', targetLang)}
            </Link>
            <Link to="/" className="nav-item nav-btn res-nav">
              {staticTranslator('For Teams', targetLang)}
            </Link>
            <form>
              <input type="text" placeholder="Search..." />
              <img src={search} alt="search" width="18" className="search-icon" />
            </form>
          </div>
          <div className="navbar-2">
            {User === null ? (
              <Link to="/Auth" className="nav-item nav-links">
                {staticTranslator('Log in', targetLang)}
              </Link>
            ) : (
              <>
                <div className="my-auto h-full">
                  <Link to={`/Users/${User?.result?._id}`}>
                    <img
                      className="w-[40px] h-[40px] rounded-full m-auto"
                      src={currentuser?.profilePicture || sampleUser}
                      alt={sampleUser || "User"}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                </div>
                <button className="nav-tem nav-links" onClick={handlelogout}>
                  {staticTranslator('logout', targetLang)}
                </button>
                <Link to={"/addpost"} className="nav-tem nav-links">
                  {staticTranslator('post', targetLang)}
                </Link>
              </>
            )}
            {/* Language Selector */}
            <div className="language-selector">
              <select
                value={targetLang}
                onChange={(e) => {
                  setPendingLanguage(e.target.value);
                  setIsVerificationModalOpen(true);
                }}
                className="language-dropdown"
              >
                {Object.entries(languages).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>
  
      <LanguageVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        // onVerify={handleVerification}
        onLanguageChange={handleLanguageChange}
        currentLanguage={targetLang}
      />
    </>
  );
}

export default Navbar;

import React from "react";
import "./Rightsidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";
import { staticTranslator } from "../../services";

const Widget = () => {
  const targetLang = localStorage.getItem("lang");
  return (
    <div className="widget">
      <h4>{staticTranslator('The Overflow Blog', targetLang)}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>
            {staticTranslator("Observability is key to the future of software (and your DevOps career)", targetLang)}
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{staticTranslator('Podcast 374: How valuable is your screen name?', targetLang)}</p>
        </div>
      </div>
      <h4>{staticTranslator('Featured on Meta', targetLang)}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{staticTranslator('Review queue workflows - Final release....', targetLang)}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>
            {staticTranslator('Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG', targetLang)}
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="pen" width="18" />
          <p>
            {staticTranslator('Outdated Answers: accepted answer is now unpinned on Stack Overflow', targetLang)}
          </p>
        </div>
      </div>
      <h4>{staticTranslator("Hot Meta Posts", targetLang)}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
            {staticTranslator('Why was this spam flag declined, yet the question marked as spam?', targetLang)}
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>
            {staticTranslator('What is the best course of action when a user has high enough rep to...', targetLang)}
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>{staticTranslator('Is a link to the "How to ask" help page a useful comment?', targetLang)}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;

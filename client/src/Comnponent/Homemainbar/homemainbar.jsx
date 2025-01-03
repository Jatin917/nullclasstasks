import React from 'react'
import './Homemainbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Questionlist from './Questionlist'
import { staticTranslator } from '../../services'
function Homemainbar() {
  const targetLang = localStorage.getItem("lang") || ""
  const user = useSelector((state)=>state.currentuserreducer)
  const location = useLocation();
  const navigate = useNavigate();
  const questionlist = useSelector((state)=>state.translatedQuestionsDataReducer)
  console.log("questionlist ", questionlist);
  const checkauth = () => {
    if (user === null) {
      alert(staticTranslator("alertMsgLogin", targetLang));
      navigate("/Auth")
    } else {
      navigate("/Askquestion")
    }
  }
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>{staticTranslator('Top Question', targetLang)}</h1>
        ) : (
          <h1>{staticTranslator('All Question', targetLang)}</h1>
        )}
        <button style={{border:"none", outline:"none"}} className="ask-btn" onClick={checkauth}>{staticTranslator('Ask Question', targetLang)}</button>
      </div>
      <div>
        {questionlist.data === null ? (
          <h1>{staticTranslator('Loading...', targetLang)}</h1>
        ) : (
          <>
            <p>{questionlist?.data?.length} {staticTranslator('questions', targetLang)}</p>
            <Questionlist questionlist={questionlist?.data} />
          </>
        )
        }</div>
    </div>
  )
}

export default Homemainbar
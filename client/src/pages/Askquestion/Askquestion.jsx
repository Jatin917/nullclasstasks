import React, { useState } from 'react'
import './Askquestion.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { askquestion } from '../../action/question'
import { staticTranslator } from '../../services'
const Askquestion = () => {
    const targetLang = localStorage.getItem("lang") || "";
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const user = useSelector((state)=>state.currentuserreducer)
    const [questiontitle, setquestiontitle] = useState("");
    const [questionbody, setquestionbody] = useState("");
    const [questiontag, setquestiontags] = useState("")
    const handlesubmit = (e) => {
        e.preventDefault();
        if (user) {
            if (questionbody && questiontitle && questiontag) {
                dispatch(askquestion({questiontitle,questionbody,questiontag,userposted:user.result.name},navigate))
                alert(staticTranslator("successfullyPostedQuestion", targetLang))

            } else {
                alert(staticTranslator("Please enter all the fields", targetLang))
            }
        } else {
            alert(staticTranslator("Login to ask question", targetLang))
        }
    }
    const handleenter = (e) => {
        if (e.code === 'Enter') {
            setquestionbody(questionbody + "\n");
        }
    }

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>{staticTranslator("Ask a public Question", targetLang)}</h1>
                <form onSubmit={handlesubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>{staticTranslator("Title", targetLang)}</h4>
                            <p>{staticTranslator("Be specific and imagine you're asking a question to another person", targetLang)}</p>
                            <input type="text" id="ask-ques-title"
                                onChange={(e) => {
                                    setquestiontitle(e.target.value);
                                }} placeholder={staticTranslator('e.g. Is there an R function for finding the index of an element in a vector?', targetLang)} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>{staticTranslator("Body", targetLang)}</h4>
                            <p>{staticTranslator("Include all the information someone would need to answer your question", targetLang)}</p>
                            <textarea name="" id="ask-ques-body" onChange={(e) => {
                                setquestionbody(e.target.value);

                            }}
                                cols="30"
                                rows="10"
                                onKeyDown={handleenter}
                            ></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>{staticTranslator("Tags", targetLang)}</h4>
                            <p>{staticTranslator("Add up to 5 tags to descibe what your question is about", targetLang)}</p>
                            <input type="text" id='ask-ques-tags' onChange={(e) => {
                                setquestiontags(e.target.value.split(" "));
                            }}
                                placeholder={staticTranslator('e.g. (xml typescript wordpress', targetLang)}
                            />
                        </label>
                    </div>
                    <input type="submit"
                        value={staticTranslator("Review your question", targetLang)}
                        className='review-btn' />
                </form>
            </div>
        </div>
    )
}

export default Askquestion
import React from 'react'
import { Link } from 'react-router-dom'
import moment from "moment"
import { staticTranslator } from '../../services';

const Question = ({ question }) => {
    const targetLang = localStorage.getItem("lang");
    return (
        <div className="display-question-container">
            <div className="display-votes-ans">
                <p>{question.upvote.length - question.downvote.length}</p>
                <p>{staticTranslator("votes", targetLang)}</p>
            </div>
            <div className="display-votes-ans">
                <p>{question.noofanswers}</p>
                <p>{staticTranslator("answers", targetLang)}</p>
            </div>
            <div className="display-question-details">
                <Link to={`/Question/${question._id}`} className='question-title-link'>
                    {question.questiontitle.length > (window.innerWidth <= 400 ? 70 : 90)
                        ? question.questiontitle.substring(
                            0,
                            window.innerWidth <= 400 ? 70 : 90
                        ) + "..."
                        : question.questiontitle
                    }
                </Link>
                <div className="display-tags-time">
                    <div className="display-tags">
                        {question.questiontags.map((tag)=>(
                            <p key={tag}> {tag}</p>
                        ))}
                    </div>
                    <p className="display-time">
                        {staticTranslator("asked", targetLang)} {moment(question.askedon).fromNow()} {question.userposted}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Question
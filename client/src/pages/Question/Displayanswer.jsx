import React from 'react'
import moment from 'moment'
import { Link,useParams } from 'react-router-dom'
import Avatar from '../../Comnponent/Avatar/Avatar'
import { useDispatch ,useSelector} from 'react-redux'
import { deleteanswer } from '../../action/question'
import { staticTranslator } from '../../services'
const Displayanswer = ({ question, handleshare }) => {
  const user =useSelector((state)=>state.currentuserreducer)
  const targetLang = localStorage.getItem("lang");
  const {id}=useParams();
  const dispatch=useDispatch()
  const handledelete = (answerid, noofanswers) => {
    dispatch(deleteanswer(id,answerid,noofanswers -1))
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerbody}</p>
          <div className="question-actions-user">
            <div>
              <button type='button' onClick={handleshare} >{staticTranslator("Share", targetLang)}</button>
              {user?.result?._id === ans?.userid && (
                <button type='button' onClick={() => handledelete(ans._id, question.noofanswers)}>{staticTranslator("Delete", targetLang)}</button>
              )}
            </div>
            <div>
            <p>{staticTranslator("answered", targetLang)} {moment(ans.answeredon).fromNow()}</p>
            <Link to={`Users/${ans.userid}`} className='user-limk' style={{ color: "#0086d8" }}>
              <Avatar backgroundColor="lightgreen"px="2px" py="2px" borderRadius="2px">
                {ans.useranswered.charAt(0).toUpperCase()}
              </Avatar>
              <div>{ans.useranswered}</div>
            </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Displayanswer
import React from 'react'
import { staticTranslator } from '../../services';

const Profilebio = ({currentprofile}) => {
  const targetLang = localStorage.getItem("lang");
  return (
    <div>
      <div>
        {currentprofile?.tags.length !==0? (
          <>
          <h4>{staticTranslator("Tags watched", targetLang)}</h4>
          {currentprofile?.tags.map((tag)=>(
            <p key={tag}>{tag}</p>
          ))}
          </>
        ):(
          <p>{staticTranslator(" 0 Tags watched", targetLang)}</p>
        )}
      </div>
      <div>{currentprofile?.about ? (
        <> 
        <h4>{staticTranslator("About", targetLang)}</h4>
        <p>{currentprofile?.about}</p>
        </>
      ):(
        <p>{staticTranslator("No bio found", targetLang)}</p>
      )}</div>
    </div>
  )
}

export default Profilebio
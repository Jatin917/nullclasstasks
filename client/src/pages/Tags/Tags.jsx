import React from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import Taglist from './Taglist'
import './Tags.css'
import {tagsList} from './tagslist'
import { staticTranslator } from '../../services'
const Tags = ({slidein}) => {
    const targetLang = localStorage.getItem("lang");
  return (
   <div className="home-container-1">
    <Leftsidebar slidein={slidein}/>
    <div className="home-container-2">
        <h1 className="tags-h1">
            {staticTranslator("Tags", targetLang)}
        </h1>
        <p className="tags-p">{staticTranslator("A tag is akeyword or label that categorizes your question with other similar question.", targetLang)}</p>
        <p className="tags-p">
            {staticTranslator("Using the right tags makes it easier for others to find and answer your question", targetLang)}
        </p>
        <div className="tags-list-container">
            {tagsList.map((tag,index)=>(
                <Taglist tag={tag} key={index}/>
            ))}
        </div>
    </div>
   </div>
  )
}

export default Tags
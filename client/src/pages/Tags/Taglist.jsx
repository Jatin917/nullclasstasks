import React from 'react'
import { staticTranslator } from '../../services'

const Taglist = ({tag}) => {
  const targetLang = localStorage.getItem("lang");
  return (
    <div className="tag">
        <h5>{staticTranslator(tag.tagName, targetLang)}</h5>
        <p>{staticTranslator(tag.tagDesc, targetLang)}</p>
    </div>
  )
}

export default Taglist
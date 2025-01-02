import React from 'react'
import './Leftsidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from "../../assets/Globe.svg"
import { staticTranslator } from '../../services'
const Leftsidebar = ({ slidein }) => {
  const targetLang = localStorage.getItem("lang");
  const slideinstyle = {
    transform: "translateX(0%)",
  };
  const slideoutstyle = {
    transform: "translateX(-100%)",
  }
  return (
    <div className="left-sidebar" style={slidein ? slideinstyle : slideoutstyle}>
      <nav className='side-nav'>
        <button className="nav-btnn">
          <NavLink to='/' className="side-nav-links" activeclassname='active'>
            <p>{staticTranslator('Home', targetLang)}</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>{staticTranslator('Public', targetLang)}</p>
          </div>
          <button className='nav-btnn'>
            <NavLink to='/Question' className='side-nav-links' activeclassname='active'>
            <img src={Globe} alt="globe" />
            <p style={{paddingLeft:'10px'}}>{staticTranslator('Questions', targetLang)}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >{staticTranslator('Tags', targetLang)}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >{staticTranslator('Users', targetLang)}</p>
            </NavLink>
          </button>
          <button className='nav-btnn'>
            <NavLink to='/Posts' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
            <p >{staticTranslator('Post', targetLang)}</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Leftsidebar
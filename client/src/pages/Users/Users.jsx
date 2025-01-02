import React from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import './Users.css'
import Userslist from './Userslist'
import { staticTranslator } from '../../services'
const Users = ({slidein}) => {
  const targetLang = localStorage.getItem("lang");
  return (
    <div className="home-container-1">
    <Leftsidebar slidein={slidein}/>
    <div className="home-container-2" style={{marginTop:"30px"}}>
        <h1 style={{fontWeight:"400"}}>{staticTranslator("Users", targetLang)}</h1>
        <Userslist/>
        </div>
        </div>
  )
}

export default Users
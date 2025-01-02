import React from 'react'
import './Users.css'
import User from './User'
import {useSelector} from "react-redux"
const Userslist = () => {
    const users=useSelector((state)=>state.translatedUsersDataReducer);
    console.log("users are ", users);
    if(!users){
      return <h2>Loading Users....</h2>
    }
  return (
    <div className="user-list-container">
        {users?.map((user)=>(
            <User user={user} key={user?._id}/>
        ))}
    </div>
  )
}

export default Userslist
import { fetchallusers } from './action/users';
import './App.css';
import {useEffect, useState} from 'react';
import Navbar from './Comnponent/Navbar/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Allroutes from './Allroutes'
import { useDispatch } from 'react-redux';
import { fetchallquestion } from './action/question';
import { auth, handleRedirectResult } from './firebase/firebasePopup';
import { getRedirectResult } from 'firebase/auth';
function App() {
  const [slidein,setslidein]=useState(true)
  const dispatch=useDispatch()
useEffect(()=>{
  dispatch(fetchallusers());
  dispatch(fetchallquestion());
},[dispatch])
const fetchRedirectResult = async () => {
  await handleRedirectResult();
};
useEffect(()=>{
  fetchRedirectResult()
},[])
useEffect(()=>{
  // fetchRedirectResult();
    if(window.innerWidth<= 768){
      setslidein(false)
    }
  },[])
  const handleslidein=()=>{
    if(window.innerWidth<=768){
      setslidein((state)=> !state);
    }
  };

  return (
    <div className="App">
      <Router>
      <Navbar handleslidein={handleslidein}/>
      <Allroutes slidein={slidein} handleslidein={handleslidein}/>
      </Router>
    </div>
  );
}

export default App;

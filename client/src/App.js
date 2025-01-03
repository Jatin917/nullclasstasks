import { fetchallusers } from "./action/users";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Comnponent/Navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Allroutes from "./Allroutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchallquestion } from "./action/question";
import { handleRedirectResult } from "./firebase/firebasePopup";
import { fetchAllPost } from "./action/post";
import { translator } from "./action/translator";


function App() {
  const [slidein, setslidein] = useState(true);
  const [targetLang, setTargetLang] = useState("en");
  const dispatch = useDispatch();
  const rawDataPost = useSelector((state) => state.postReducer);
  const rawDataUser = useSelector((state) => state.usersreducer);
  const rawDataQuestion = useSelector((state) => state.questionreducer);
  useEffect(() => {
    dispatch(fetchAllPost());
    dispatch(fetchallusers());
    dispatch(fetchallquestion());
  }, [dispatch]);
  useEffect(() => {
    if (targetLang) dispatch(translator(targetLang, rawDataPost, "POSTS"));
  }, [dispatch, rawDataPost, targetLang]);
  useEffect(() => {
    if (targetLang) dispatch(translator(targetLang, rawDataUser, "USERS"));
  }, [dispatch, rawDataUser, targetLang]);
  useEffect(() => {
    if (targetLang)
      dispatch(translator(targetLang, rawDataQuestion, "QUESTIONS"));
  }, [dispatch, rawDataQuestion, targetLang]);
  const fetchRedirectResult = async () => {
    await handleRedirectResult();
  };
  useEffect(() => {
    fetchRedirectResult();
  }, []);
  useEffect(() => {
    // fetchRedirectResult();
    if (window.innerWidth <= 768) {
      setslidein(false);
    }
  }, []);
  const handleslidein = () => {
    if (window.innerWidth <= 768) {
      setslidein((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          handleslidein={handleslidein}
        />
        <Allroutes slidein={slidein} handleslidein={handleslidein} />
      </Router>
    </div>
  );
}

export default App;

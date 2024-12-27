import axios from "axios";
import { getGoogleToken } from "../firebase/firebasePopup";

const API=axios.create({
    baseURL:"http://localhost:5000"
});


API.interceptors.request.use(async (req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.Authorization=`Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`;
    }
    else {
        const googleToken = await getGoogleToken(); // Get the Google token dynamically
        if (googleToken) {
            req.headers.Authorization = `Bearer ${googleToken}`; // Set the Google token
        }
    }
    return req;
})

export const login=(authdata)=>API.post("user/login",authdata);
export const signup=(authdata)=>API.post("user/signup",authdata);
export const googleAuth=(authdata)=>API.post("user/googleauth",authdata);
export const getallusers=()=> API.get("/user/getallusers");
export const updateprofile=(id,updatedata)=>API.patch(`user/update/${id}`,updatedata)


export const postquestion=(questiondata)=>API.post("/questions/Ask",questiondata);
export const getallquestions=()=>API.get("/questions/get");
export const deletequestion=(id)=>API.delete(`/questions/delete/${id}`);
export const votequestion=(id,value)=>API.patch(`/questions/vote/${id}`,{value});


export const postanswer=(id,noofanswers,answerbody,useranswered)=>API.patch(`/answer/post/${id}`,{noofanswers,answerbody,useranswered});
export const deleteanswer=(id,answerid,noofanswers)=>API.patch(`/answer/delete/${id}`,{answerid,noofanswers});

export const getAllPost = ()=> API.get("/media/post");
export const likePost = (id)=> API.patch(`media/post/${id}/like`)
export const dislikePost = (id)=> API.patch(`media/post/${id}/unlike`)
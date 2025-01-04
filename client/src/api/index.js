import axios from "axios";
import { getGoogleToken } from "../firebase/firebasePopup";

const API=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL_BACKEND
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
export const commentOnPost = (id, content)=> API.post(`media/post/${id}/comment`, content)
export const createPost = (formData)=> API.post(`media/post`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const sendFriendReq = (id) => API.post(`media/sendreq`, {fromId:id});
export const acceptReq = (id) => API.post(`media/acceptreq`, {reqId:id});
export const cancelReq = (id) => API.post(`media/cancelreq`, {reqId:id});
export const unfriendReq = (id) => API.post(`media/unfriendreq`, {reqId:id});
export const rejectReq = (id) => API.post(`media/rejectreq`, {reqId:id});

export const sendOtpEmailVerification = (email) => API.post(`user/sendOtpEmail`, {userId:email});
export const sendOtpSmsVerification = (phoneNumber) => API.post(`user/sendOtpSms`, {userId:phoneNumber});
export const otpEmailVerification = (otp, userId) => API.post(`user/emailVerification`, {otp, userId});
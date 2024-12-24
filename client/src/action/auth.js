import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}
export const login =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.login(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}

export const googleAuth =(naviagte)=> async(dispatch)=>{
    try {
        // console.log("google authData is: ", authdata);
        const{data}=await api.googleAuth();
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        naviagte("/")
        return Promise.resolve();
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}
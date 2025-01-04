import * as api from '../api';

export const fetchAllPost = ()=> async(dispatch)=>{
    try {
        const {data} = await api.getAllPost();
        dispatch({type:"FETCH_POSTS", payload:data.post});
    } catch (error) {
        console.log(error)
    }
}

export const fetchPost = (id) => async(disptach)=>{
    try {
        const { data } = await api.getPost(id);
        disptach({type:"FETCH_POST", payload:data.post});
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) =>async(dispatch)=>{
    try {
        const {status, data} = await api.likePost(id);
        if(status===200){
            dispatch({type:"CHANGE_POST_STAT", payload:data.newPost});
            return { success: true, message: "Post liked successfully!" };
        }
        return { success: false, message: "Unable to like the post. Please try again." };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}
export const disLikePost = (id) =>async(dispatch)=>{
    try {
        const {status, data} = await api.dislikePost(id);
        if(status===200){
            dispatch({type:"CHANGE_POST_STAT", payload:data.newPost});
            return { success: true, message: "Post disliked successfully!" };
        }
        return { success: false, message: "Unable to dislike the post. Please try again." };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}

export const commentOnPost = (id, content) =>async(dispatch)=>{
    try {
        // console.log("comment on post action", content)
        const {status, data} = await api.commentOnPost(id, {content:content});
        if(status===200){
            dispatch({type:"CHANGE_POST_STAT", payload:data.newPost});
            return { success: true, message: "Commented successfully!" };
        }
        return { success: false, message: "Unable to comment the post. Please try again." };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}

export const createPost = (formData, navigate)=> async(dispatch)=>{
    try {
        const {status, data} = await api.createPost(formData);
        console.log(status);
        if(status===200){
            dispatch({type:"CREATE_POST", payload:data.post});
            navigate("/Posts");
            return { success: true, message: "Post Created successfully!" };
        }
        else if(status===403){
            console.log("Daily Limit Exceded!")
        }
        else if(status===401){
            console.log("This feature is not for you as you don't have friends");
        }
        return { success: false, message: "Unable to create the post. Please try again." };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}

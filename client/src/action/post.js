import * as api from '../api';

export const fetchAllPost = ()=> async(dispatch)=>{
    try {
        const {data} = await api.getAllPost();
        dispatch({type:"FETCH_POSTS", payload:data.post});
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
        console.log("comment on post action", content)
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


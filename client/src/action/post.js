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
            dispatch({type:"LIKE_POST", payload:data.newPost});
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
            dispatch({type:"DISLIKE_POST", payload:data.newPost});
            return { success: true, message: "Post disliked successfully!" };
        }
        return { success: false, message: "Unable to dislike the post. Please try again." };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}

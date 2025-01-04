import * as api from '../api';

export const sendReq = (id) => async (dispatch) =>{
    try {
        const { data, status } = await api.sendFriendReq(id);
        if(status===200){
            dispatch({type:"FRIEND_REQ_HANDLE", payload:data});
            return {success:true, message:"Successfully sent request"};
        }
    return {success:false, message:"Error in sending request"};
} catch (error) {
    return {success:false, message:"Error please try again later"};
    }
}
export const acceptReq = (id) => async (dispatch) =>{
    try {
        const { data, status } = await api.acceptReq(id);
        if(status===200){
            // // // // // // console.log(data);
            dispatch({type:"FRIEND_REQ_HANDLE", payload:data});
            return {success:true, message:"Successfully accepted request"};
        }
    return {success:false, message:"Error in accepting request"};
} catch (error) {
    return {success:false, message:"Error please try again later"};
    }
}
export const cancelReq = (id) => async (dispatch) =>{
    try {
        const { data, status } = await api.cancelReq(id);
        if(status===200){
            // // console.log(data);
            dispatch({type:"FRIEND_REQ_HANDLE", payload:data});
            return {success:true, message:"Successfully Cancelled request"};
        }
    return {success:false, message:"Error in Cancelling request"};
} catch (error) {
    return {success:false, message:"Error please try again later"};
    }
}
export const rejectReq = (id) => async (dispatch) =>{
    try {
        const { data, status } = await api.rejectReq(id);
        if(status===200){
            // console.log(data);
            dispatch({type:"FRIEND_REQ_HANDLE", payload:data});
            return {success:true, message:"Successfully rejectted request"};
        }
    return {success:false, message:"Error in rejecting request"};
} catch (error) {
    return {success:false, message:"Error please try again later"};
    }
}
export const unfriendReq = (id) => async (dispatch) =>{
    try {
        const { data, status } = await api.unfriendReq(id);
        if(status===200){
            // console.log(data);
            dispatch({type:"FRIEND_REQ_HANDLE", payload:data});
            return {success:true, message:"Successfully unfriended request"};
        }
    return {success:false, message:"Error in unfriendinging request"};
} catch (error) {
    return {success:false, message:"Error please try again later"};
    }
}
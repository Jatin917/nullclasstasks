const postReducer =(states=[],action)=>{
    switch (action.type) {
        case "FETCH_POSTS":
            return action.payload;
        case "CHANGE_POST_STAT":
            return states.map((post) =>
                post._id === action.payload._id ? action.payload : post
              );
        
        default:
            return states;
    }
}
export default postReducer;
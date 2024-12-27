const postReducer =(states=[],action)=>{
    switch (action.type) {
        case "FETCH_POSTS":
            return action.payload;
        case "CHANGE_POST_STAT":
            return states.map((post) =>
                post._id === action.payload._id ? action.payload : post
              );
        case "CREATE_POST":
            return [...states, action.payload[0]];
        default:
            return states;
    }
}
export default postReducer;
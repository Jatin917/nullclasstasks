const usersreducer =(states=[],action)=>{
    switch (action.type) {
        case "FETCH_USERS":
            return action.payload;
        case "UPDATE_CURRENT_USER":
            return states.map((state)=>
            state._id=== action.payload._id ? action.payload:state);
        case "FRIEND_REQ_HANDLE":
            const {sent, pending} = action.payload;
            const updatedStates = states.map((s) => {
                if (s._id === sent._id) return sent;
                if (s._id === pending._id) return pending;
                return s;
            });
            return updatedStates;
        default:
            return states;
    }
}
export default usersreducer;
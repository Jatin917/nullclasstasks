export const translatedPostDataReducer = (state=[], action) =>{
    switch(action.type){
        case "TRANSLATED_POST_DATA":
            const updatedState = action.payload;
            return updatedState;
        default:
            return state;
    }
}
export const translatedUsersDataReducer = (state=[], action) =>{
    switch(action.type){
        case "TRANSLATED_USERS_DATA":
            const updatedState = action.payload;
            return updatedState;
        default:
            return state;
    }
}

export const translatedQuestionsDataReducer = (state=[], action) =>{
    switch(action.type){
        case "TRANSLATED_QUESTIONS_DATA":
            const updatedState = action.payload;
            return updatedState;
        default:
            return state;
    }
}
import {combineReducers} from "redux"
import authreducer from "./auth"
import currentuserreducer from "./currentuser";
import usersreducer from "./users";
import questionreducer from "./question";
import postReducer from "./post";
import { translatedPostDataReducer, translatedQuestionsDataReducer, translatedUsersDataReducer } from "./translatorReducer";

export default combineReducers({
    authreducer,
    currentuserreducer,
    usersreducer,
    questionreducer,
    postReducer,
    translatedPostDataReducer,
    translatedUsersDataReducer,
    translatedQuestionsDataReducer
});
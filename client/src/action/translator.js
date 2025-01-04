import axios from "axios";
import translations from "../translations/translation";

const translatorApi = async (target, query) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/translate?target=${target}&query=${query}`
    );
    if (response.data && response.data.translation) {
      return { success: true, data: response.data.translation };
    }
    return { success: false, message: "Translation failed, returning fallback text." };
  } catch (error) {
    console.error("Translation API error:", error);
    return { success: false, message: "Error in translation, returning fallback text." };
  }
};


const skips = [
  "profilePicture",
  "_id",
  "created_at",
  "media_url",
  "media_type",
  "likes",
  "shares",
  "updated_at",
  "user_id",
  "userid",
  "askedon",
  "answeredon",
  "email",
  "name",
  "password",
  "provider",
  "joinedon",
];

const translateItem = async (target, item) => {

  const result = await translatorApi(target, item);
  if (result.success) {
    return result.data;
  }

  return item;
};

export const translateData = async (target, data) => {
  if (typeof data === "string") {
    if(translations?.[target]?.[data]){
      return translations[target][data]
    }
    return await translateItem(target, data);
  }

  if (Array.isArray(data)) {
    return await Promise.all(data.map(async (item) => await translateData(target, item)));
  }

  if (typeof data === "object" && data !== null) {
    const translatedObject = {};
    for (const [key, value] of Object.entries(data)) {
      if (
        skips.includes(key) ||
        typeof value === "number" ||
        value instanceof Date
      ) {
        translatedObject[key] = value; 
      } else {
        translatedObject[key] = await translateData(target, value);
      }
    }
    return translatedObject;
  }

  return data;
};

export const translator = (target, data, dataOf ) =>async (dispatch) => {
  if(dataOf==="POSTS"){
    if(target==='en'){
      dispatch({type:"TRANSLATED_POST_DATA", payload:data})
      return null;
    }
    const translatedData = await translateData(target, data);
    dispatch({type:"TRANSLATED_POST_DATA", payload:translatedData});
  }
  else if(dataOf==="USERS"){
    if(target==='en'){
      dispatch({type:"TRANSLATED_USERS_DATA", payload:data})
      return null;
    }
    const translatedData = await translateData(target, data);
    dispatch({type:"TRANSLATED_USERS_DATA", payload:translatedData});
  }
  else if(dataOf==="QUESTIONS"){
    if(target==='en'){
    dispatch({type:"TRANSLATED_QUESTIONS_DATA", payload:data})
      return null;
    }
    const translatedData = await translateData(target, data);
    dispatch({type:"TRANSLATED_QUESTIONS_DATA", payload:translatedData});
  }
};
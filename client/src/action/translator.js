import axios from "axios";
import { useSelector } from "react-redux";
import translations from "../translations/translation";

// API call to get translation
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


// Skips array (keys to avoid translating)
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

// Translate individual item
const translateItem = async (target, item) => {

  const result = await translatorApi(target, item);
  if (result.success) {
    return result.data;
  }

  return item; // Return the original item if translation fails
};

// Recursive translation function
export const translateData = async (target, data) => {
  // Handle if data is a string
  if (typeof data === "string") {
    if(translations?.[target]?.[data]){
      return translations[target][data]
    }
    return await translateItem(target, data);
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return await Promise.all(data.map(async (item) => await translateData(target, item)));
  }

  // Handle objects
  if (typeof data === "object" && data !== null) {
    const translatedObject = {};
    for (const [key, value] of Object.entries(data)) {
      // Skip translation for keys in the 'skips' array or unsupported value types
      if (
        skips.includes(key) ||
        typeof value === "number" ||
        value instanceof Date
      ) {
        translatedObject[key] = value; // Don't translate, just copy the value
      } else {
        // Recursively translate nested data
        translatedObject[key] = await translateData(target, value);
      }
    }
    return translatedObject;
  }

  // Return original if not string, array, or object
  return data;
};

// The main translator function
export const translator = (target, data, dataOf ) =>async (dispatch) => {
  // Pass raw data directly to translateData
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
  // return translatedData
};
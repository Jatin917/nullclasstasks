import { translateData } from "../action/translator";
import translations from "../translations/translation";

export const staticTranslator = (key, lang) => {
    const updatedKey = key
    .split(" ")
    .map((word, index) => 
        index === 0 
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of subsequent words
    )
    .join("");

    if(lang===null || lang==="" || lang===undefined) lang="en";
    if (!translations[lang]) {
        translations[lang] = {}; 
    }

    if (translations[lang]?.[updatedKey]) {
        return translations[lang][updatedKey];
    }
    translateAndUpdateTranslation(lang, updatedKey, key);
    return key;
};

const translateAndUpdateTranslation =async (lang, updatedKey, key) =>{
    const value = await translateData(lang, key);
    // console.log("translated values in updater funciton", updatedKey, lang);
    translations[lang][updatedKey] = value;
    return value;
}
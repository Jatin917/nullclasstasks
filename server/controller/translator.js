import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import PQueue from "p-queue";

// In-memory cache
const cache = {};

const queue = new PQueue({
    interval: 1000, // Time window in milliseconds (1 second)
    intervalCap: 2, // Max number of requests per time window
  });

const translatorCache = async (target, query) => {
  try {
    // Step 1: Check if the translation exists in the cache
    if (cache[target] && cache[target][query]) {
      return cache[target][query];
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Step 2: Load the target language JSON file if it exists
    const filePath = path.resolve(__dirname, "../translation", `${target}.json`);
    // console.log(filePath);
    let translations = {};

    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      translations = JSON.parse(fileData);
      // Update the cache with loaded translations
      cache[target] = { ...cache[target], ...translations };
    } catch (fileError) {
      console.log(fileError);
      console.error(`Translation file for ${target} not found. Creating a new one.`);
    }

    // Step 3: Check if the query exists in the loaded translations
    if (translations[query]) {
      return translations[query];
    }

    // Step 4: Return null if the translation is not found
    return null;
  } catch (error) {
    console.error("Error in translatorCache:", error);
    return null;
  }
};

export const translator = async (req, res) => {
  const { target, query } = req.query;

  try {
    // Step 1: Check the cache
    const cachedTranslation = await translatorCache(target, query);
    if (cachedTranslation) {
      return res.json({ translation: cachedTranslation });
    }

    // Step 2: Fetch translation from Lingva API
    const translation = await queue.add(async () => {
        const response = await axios.get(`https://lingva.ml/api/v1/en/${target}/${query}`);
        return response.data.translation;
      });

    // Step 3: Update cache and file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(__dirname, "../translation", `${target}.json`);
    cache[target] = { ...cache[target], [query]: translation };

    try {
      await fs.writeFile(filePath, JSON.stringify(cache[target], null, 2), "utf-8");
    } catch (fileWriteError) {
      console.error("Error writing to translation file:", fileWriteError);
    }

    // Step 4: Return the translation
    res.json({ translation });
  } catch (error) {
    console.error("Error calling Lingva API:", error.message);
    res.status(500).json({ error: "Failed to translate" });
  }
};

// Import necessary modules
import Fuse from "fuse.js";
import fetch from "node-fetch";

const JSON_URL =
  "https://raw.githubusercontent.com/simplr-sh/coin-logos/refs/heads/main/source-with-image-urls.json";
let cachedData = null; // Cache to store JSON data
let fuse = null; // Fuse.js instance

// Function to fetch and cache the JSON data
async function fetchAndCacheJSON() {
  if (cachedData) {
    // Return cached data if already fetched
    return cachedData;
  }

  console.log("Fetching JSON data...");
  const response = await fetch(JSON_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch JSON: ${response.statusText}`);
  }

  // Parse and cache the JSON data
  cachedData = await response.json();

  // Set up Fuse.js for fuzzy search
  fuse = new Fuse(cachedData, {
    keys: ["symbol"], // Search by the "symbol" field
    threshold: 0.2 // Adjust this threshold for sensitivity
  });

  return cachedData;
}

const removeNumbers = str => str.replace(/\d+/g, ""); // Removes all digits

// Function to search for a matching object by symbol
export default async function findCoinGeckoAssetBySymbol(symbol) {
  // Ensure the JSON data is loaded and Fuse.js is initialized
  await fetchAndCacheJSON();

  // remove the suffic and the numbers
  const normalizedSymbol = removeNumbers(symbol).split("-")[0];

  // Perform the fuzzy search
  const result = fuse.search(normalizedSymbol);

  // Return the first matched object or null if no match is found
  return result.length ? result[0].item : null;
}

// Example usage
// (async () => {
//   try {
//     const nameToSearch = "Renzo";
//     const match = await findMatchByName(nameToSearch);

//     if (match) {
//       console.log("Match found:", match);
//     } else {
//       console.log(`No match found for "${nameToSearch}".`);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

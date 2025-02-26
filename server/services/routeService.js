import axios from "axios";

const API_URL = "https://scrapper-rsro.onrender.com/files/list";

/**
 * Fetch the list of files from the API
 * @returns {Promise<Array>} - A promise resolving to an array of route objects
 */
export const fetchRoutes = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data?.files) {
      return response.data.files.map(parseRoute);
    }
    return [];
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

/**
 * Parses a filename into a structured route object
 * @param {string} filename - The raw filename string
 * @returns {Object} - Parsed route object
 */
const parseRoute = (filename) => {
  const regex = /(.+)___(.+)_from_(\d+)_to_(\d+)_([\d]+)\.pdf/;
  const match = filename.match(regex);

  if (!match) {
    console.warn("Invalid filename format:", filename);
    return null;
  }

  return {
    from: match[1].replace(/_/g, " "), // Convert underscores to spaces
    to: match[2].replace(/_/g, " "),
    pdf: filename,
    effective_date: match[3],
    time_table_no: match[5],
  };
};

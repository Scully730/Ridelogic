import axios from 'axios';

const baseUrl = "https://scrapper-rsro.onrender.com"; // Replace with actual URL

export const getPlaces = async () => {
  try {
    const response = await axios.get(`${baseUrl}/places`);
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

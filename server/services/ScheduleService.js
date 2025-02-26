import axios from 'axios';

const baseUrl = "https://scrapper-rsro.onrender.com"; // Replace with actual URL

export const getScheduleTimes = async (user_location , destination) => {
  try {
    const response = await axios.get(`${baseUrl}/schedules`, {
      params: {
        user_location,
        destination,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return [];
  }
};

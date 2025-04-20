import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // or whatever port your backend is running on

export const fetchHarvardArtworks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/artwork/search`, {
      params: {
        q: query,
        size: 20,
      }
    });
    console.log('Harvard API raw response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Harvard API:', error);
    throw error;
  }
};
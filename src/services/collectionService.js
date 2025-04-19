import axios from 'axios';
import * as tokenService from './tokenService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/collections`;

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Helper function to handle API errors
const handleApiError = (error, customMessage) => {
  console.error(customMessage, error);
  if (error.response) {
    throw new Error(error.response.data.message || customMessage);
  } else if (error.request) {
    throw new Error('No response received from server');
  } else {
    throw new Error(error.message || customMessage);
  }
};

export const getCollections = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching collections');
  }
};

export const createCollection = async (collectionData) => {
  try {
    const user = tokenService.getUserFromToken();
    if (!user) {
      throw new Error('User not authenticated');
    }
    const dataWithUser = { ...collectionData, user: user.id };
    const response = await api.post('/', dataWithUser);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error creating collection');
  }
};

export const updateCollection = async (collectionId, collectionData) => {
  try {
    const response = await api.put(`/${collectionId}`, collectionData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error updating collection');
  }
};

export const deleteCollection = async (collectionId) => {
  try {
    await api.delete(`/${collectionId}`);
  } catch (error) {
    handleApiError(error, 'Error deleting collection');
  }
};

export const addArtworkToCollection = async (collectionId, artworkData) => {
  try {
    const response = await api.post(`/${collectionId}/artworks`, artworkData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error adding artwork to collection');
  }
};

export const getCollection = async (collectionId) => {
  try {
    const response = await api.get(`/${collectionId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching collection');
  }
};
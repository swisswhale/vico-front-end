import axios from 'axios';
import * as tokenService from './tokenService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/artworks`;

const setAuthHeader = () => {
  return {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  };
};

export const searchArtworks = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query: searchTerm },
      ...setAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
};

export const getArtwork = async (artworkId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${artworkId}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching artwork:', error);
    throw error;
  }
};

export const saveArtwork = async (artworkData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, artworkData, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error saving artwork:', error);
    throw error;
  }
};

export const getAllArtworks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching all artworks:', error);
    throw error;
  }
};

export const addComment = async (artworkId, commentText) => {
  try {
    const response = await axios.post(`${BASE_URL}/${artworkId}/comments`, { text: commentText }, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deleteArtwork = async (artworkId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${artworkId}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error deleting artwork:', error);
    throw error;
  }
};
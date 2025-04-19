import axios from 'axios';
import * as tokenService from './tokenService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/collections`

export const getCollections = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export const createCollection = async (collectionData) => {
  try {
    const response = await axios.post(BASE_URL, collectionData, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

export const updateCollection = async (collectionId, collectionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${collectionId}`, collectionData, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating collection:', error);
    throw error;
  }
};

export const deleteCollection = async (collectionId) => {
  try {
    await axios.delete(`${BASE_URL}/${collectionId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
};

export const addArtworkToCollection = async (collectionId, artworkData) => {
  try {
    const response = await axios.post(`${BASE_URL}/${collectionId}/artworks`, artworkData, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding artwork to collection:', error);
    throw error;
  }
};

export const getCollection = async (collectionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${collectionId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};
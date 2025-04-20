const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
const BASE_ARTWORK_URL = `${BASE_URL}/artwork`;
const BASE_COLLECTION_URL = `${BASE_URL}/collections`;
const BASE_USER_URL = `${BASE_URL}/users`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

const index = async () => {
  try {
    console.log('Fetching from:', BASE_ARTWORK_URL); 
    const res = await fetch(BASE_ARTWORK_URL, { headers: getAuthHeaders() });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in index:', error);
    throw error;
  }
};


const show = async (artworkId) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}`, { headers: getAuthHeaders() });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in show:', error);
    throw error;
  }
};

const create = async (artworkFormData) => {
  try {
    const res = await fetch(BASE_ARTWORK_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(artworkFormData),
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in create:', error);
    throw error;
  }
};

const createComment = async (artworkId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(commentFormData),
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in createComment:', error);
    throw error;
  }
};

const deleteArtwork = async (artworkId) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in deleteArtwork:', error);
    throw error;
  }
};

const update = async (artworkId, artworkFormData) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(artworkFormData),
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in update:', error);
    throw error;
  }
};

const getCollections = async () => {
  try {
    const res = await fetch(BASE_COLLECTION_URL, { headers: getAuthHeaders() });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in getCollections:', error);
    throw error;
  }
};

const createCollection = async (collectionData) => {
  try {
    const res = await fetch(BASE_COLLECTION_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(collectionData),
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in createCollection:', error);
    throw error;
  }
};

const deleteCollection = async (collectionId) => {
  try {
    const res = await fetch(`${BASE_COLLECTION_URL}/${collectionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Error in deleteCollection:', error);
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const res = await fetch(`${BASE_USER_URL}/me`, { headers: getAuthHeaders() });
    return handleResponse(res);
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

export { 
  index, 
  show, 
  create, 
  createComment, 
  deleteArtwork, 
  update, 
  getCollections, 
  createCollection, 
  deleteCollection,
  getCurrentUser
};
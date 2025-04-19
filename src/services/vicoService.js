const BASE_ARTWORK_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/artwork`;
const BASE_COLLECTION_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/collections`;

const index = async () => {
  try {
    const res = await fetch(BASE_ARTWORK_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch artworks');
    return res.json();
  } catch (error) {
    console.error('Error in index:', error);
    throw error;
  }
};

const show = async (artworkId) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch artwork');
    return res.json();
  } catch (error) {
    console.error('Error in show:', error);
    throw error;
  }
};

const create = async (artworkFormData) => {
  try {
    const res = await fetch(BASE_ARTWORK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkFormData),
    });
    if (!res.ok) throw new Error('Failed to create artwork');
    return res.json();
  } catch (error) {
    console.error('Error in create:', error);
    throw error;
  }
};

const createComment = async (artworkId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    if (!res.ok) throw new Error('Failed to create comment');
    return res.json();
  } catch (error) {
    console.error('Error in createComment:', error);
    throw error;
  }
};

const deleteArtwork = async (artworkId) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete artwork');
    return res.json();
  } catch (error) {
    console.error('Error in deleteArtwork:', error);
    throw error;
  }
};

const update = async (artworkId, artworkFormData) => {
  try {
    const res = await fetch(`${BASE_ARTWORK_URL}/${artworkId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkFormData),
    });
    if (!res.ok) throw new Error('Failed to update artwork');
    return res.json();
  } catch (error) {
    console.error('Error in update:', error);
    throw error;
  }
};

// New functions for collections

const getCollections = async () => {
  try {
    const res = await fetch(BASE_COLLECTION_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch collections');
    return res.json();
  } catch (error) {
    console.error('Error in getCollections:', error);
    throw error;
  }
};

const createCollection = async (collectionData) => {
  try {
    const res = await fetch(BASE_COLLECTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collectionData),
    });
    if (!res.ok) throw new Error('Failed to create collection');
    return res.json();
  } catch (error) {
    console.error('Error in createCollection:', error);
    throw error;
  }
};

const deleteCollection = async (collectionId) => {
  try {
    const res = await fetch(`${BASE_COLLECTION_URL}/${collectionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete collection');
    return res.json();
  } catch (error) {
    console.error('Error in deleteCollection:', error);
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
  deleteCollection 
};
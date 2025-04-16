const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/artwork`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (artworkId) => {
  try {
    const res = await fetch(`${BASE_URL}/${artworkId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (artworkFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (artworkId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${artworkId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteArtwork = async (artworkId) => {
  try {
    const res = await fetch(`${BASE_URL}/${artworkId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(artworkId, artworkFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${artworkId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { index, show, create, createComment, deleteArtwork, update };
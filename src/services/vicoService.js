const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/artcollection`;

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

const show = async (artcollectionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${artcollectionId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (artCollectionFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artCollectionFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (artCollectionId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${artCollectionId}/comments`, {
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

const deleteHoot = async (artCollectionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${artCollectionId}`, {
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

async function update(artCollectionId, artCollectionFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${artCollectionId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artCollectionFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { index, show, create, createComment, deleteHoot, update };
import React, { useState } from 'react';
import * as collectionService from '../../services/collectionService';

const EditCollectionForm = ({ collection, onCollectionUpdated, onClose }) => {
  const [formData, setFormData] = useState({
    name: collection.name,
    description: collection.description
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Collection name is required');
      return;
    }

    try {
      const updatedCollection = await collectionService.updateCollection(collection._id, formData);
      onCollectionUpdated(updatedCollection);
    } catch (err) {
      setError('Failed to update collection: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Collection</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="name">Collection Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Collection</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditCollectionForm;
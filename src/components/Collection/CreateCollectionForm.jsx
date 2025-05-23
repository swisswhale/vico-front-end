import React, { useState } from 'react';
import * as collectionService from '../../services/collectionService';

const CreateCollectionForm = ({ onCollectionCreated, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

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
    setIsSubmitting(true); 

    if (!formData.name.trim()) {
      setError('Collection name is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const newCollection = await collectionService.createCollection(formData);
      onCollectionCreated(newCollection);
      onClose();
    } catch (err) {
      console.error('Error creating collection:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred while creating the collection');
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="create-collection-form">
      <h2 className="collectionmodalcss">Create New Collection</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className='modal-inputlabel'>Collection Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength="100" 
          />
        </div>
        <div>
          <label htmlFor="description" className='modal-inputlabel'>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500" 
          />
        </div>
        <button type="submit" disabled={isSubmitting} className='modal-input'>
          {isSubmitting ? 'Creating...' : 'Create Collection'}
        </button>
        <button type="button" onClick={onClose} disabled={isSubmitting} className='modal-inputcancel'>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCollectionForm;
import React, { useState } from 'react';

const EditCollectionForm = ({ collection, onCollectionUpdated, onClose }) => {
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCollectionUpdated({
      ...collection,
      name,
      description
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Collection</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Update Collection</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditCollectionForm;
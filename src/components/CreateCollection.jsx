import React, { useState } from 'react';
import { createCollection } from '../services/collectionService';
import { addArtworkToCollection } from '../services/artworkService';
import SearchArtwork from './SearchArtwork';

const CreateCollection = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const newCollection = await createCollection(title, description, isPublic);
      // Add selected artworks to the collection
      for (let artwork of selectedArtworks) {
        await addArtworkToCollection(artwork.id, newCollection.id);
      }
      alert('Collection created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setIsPublic(false);
      setSelectedArtworks([]);
    } catch (err) {
      console.error('Error creating collection:', err);
      setError(`Failed to create collection: ${err.message || 'Please try again.'}`);
    }
  };

  const handleArtworkSelect = (artwork) => {
    setSelectedArtworks(prev => [...prev, artwork]);
  };

  return (
    <div>
      <h2>Create New Collection</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Make Public
          </label>
        </div>
        <button type="submit">Create Collection</button>
      </form>

      <h3>Selected Artworks:</h3>
      {selectedArtworks.map(artwork => (
        <div key={artwork.id}>
          <p>{artwork.title} by {artwork.artist}</p>
        </div>
      ))}

      <SearchArtwork onArtworkSelect={handleArtworkSelect} />
    </div>
  );
};

export default CreateCollection;
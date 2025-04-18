// src/pages/NewCollection.jsx
import React, { useState } from 'react';
import ArtworkSearch from '../components/SearchArtwork';
import * as collectionService from '../services/collectionService';

const NewCollection = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [collectionTitle, setCollectionTitle] = useState('');

  const handleArtworkSelect = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleAddToCollection = async () => {
    try {
      await collectionService.addArtworkToCollection(selectedArtwork.id);
      alert('Artwork added to collection!');
      setSelectedArtwork(null);
    } catch (error) {
      console.error('Error adding artwork to collection:', error);
    }
  };

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    try {
      await collectionService.createCollection(collectionTitle);
      alert('Collection created!');
      setCollectionTitle('');
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div>
      <h1>Create New Collection</h1>
      <form onSubmit={handleCreateCollection}>
        <input
          type="text"
          value={collectionTitle}
          onChange={(e) => setCollectionTitle(e.target.value)}
          placeholder="Collection Title"
        />
        <button type="submit">Create Collection</button>
      </form>

      <h2>Search and Add Artworks</h2>
      <ArtworkSearch onArtworkSelect={handleArtworkSelect} />

      {selectedArtwork && (
        <div>
          <h3>Selected Artwork</h3>
          <img src={selectedArtwork.primaryImageSmall} alt={selectedArtwork.title} />
          <p>{selectedArtwork.title} by {selectedArtwork.artist}</p>
          <button onClick={handleAddToCollection}>Add to Collection</button>
        </div>
      )}
    </div>
  );
};

export default NewCollection;
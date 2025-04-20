// src/components/Collection/CollectionDetails.jsx
import React, { useState } from 'react';
import Modal from '../Modal';

const CollectionDetails = ({ collection, onClose }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2>{collection.name}</h2>
      <p>{collection.description}</p>
      <div className="artwork-grid">
        {collection.artworks.map(artwork => (
          <div key={artwork._id} className="artwork-tile" onClick={() => handleArtworkClick(artwork)}>
            <img src={artwork.imageUrl} alt={artwork.title} />
            <p>{artwork.title}</p>
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <Modal isOpen={true} onClose={() => setSelectedArtwork(null)}>
          <h3>{selectedArtwork.title}</h3>
          <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} style={{maxWidth: '100%'}} />
          <p><strong>Artist:</strong> {selectedArtwork.artist}</p>
          <p><strong>Date:</strong> {selectedArtwork.date}</p>
          <p><strong>Medium:</strong> {selectedArtwork.medium}</p>
          <p><strong>Dimensions:</strong> {selectedArtwork.dimensions}</p>
          <p><strong>Description:</strong> {selectedArtwork.description}</p>
        </Modal>
      )}
    </Modal>
  );
};

export default CollectionDetails;
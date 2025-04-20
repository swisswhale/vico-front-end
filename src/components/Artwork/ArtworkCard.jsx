import React from 'react';


const ArtworkCard = ({ artwork, onClick }) => {
  return (
    <div className="artwork-card" onClick={onClick}>
      <img 
        src={artwork.primaryimageurl || 'placeholder-image-url.jpg'} 
        alt={artwork.title} 
        onError={(e) => {e.target.onerror = null; e.target.src='placeholder-image-url.jpg'}}
      />
      <h3>{artwork.title || 'Untitled'}</h3>
      <p>{artwork.people?.[0]?.name || 'Unknown Artist'}</p>
    </div>
  );
};

export default ArtworkCard;
/*
import React from 'react';
import './ArtworkModal.css'

const ArtworkCard = ({ artwork, onClose, onDelete }) => {
  return (
    <Modal onClose={onClose}>
      <div className="artwork-card">
        <img src={artwork.primaryImage} alt={artwork.title} />
        <h2>{artwork.title}</h2>
        <p>Artist: {artwork.artistDisplayName}</p>
        <p>Date: {artwork.objectDate}</p>
        <p>Medium: {artwork.medium}</p>
        <p>Dimensions: {artwork.dimensions}</p>
        <p>Department: {artwork.department}</p>
        <button onClick={onDelete}>Remove from Collection</button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ArtworkCard;
*/
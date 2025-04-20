import React from 'react';
import './ArtworkModal.css'

const ArtworkModal = ({ artwork, onClose, onAdd }) => {
  return (
    <div className="artwork-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{artwork.title || 'Untitled'}</h2>
        <img 
          src={artwork.primaryimageurl || 'placeholder-image-url.jpg'} 
          alt={artwork.title} 
          onError={(e) => {e.target.onerror = null; e.target.src='placeholder-image-url.jpg'}}
        />
        <p><strong>Artist:</strong> {artwork.people?.[0]?.name || 'Unknown Artist'}</p>
        <p><strong>Date:</strong> {artwork.dated || 'Unknown'}</p>
        <p><strong>Medium:</strong> {artwork.medium || 'Not specified'}</p>
        <p><strong>Dimensions:</strong> {artwork.dimensions || 'Not specified'}</p>
        <p><strong>Culture:</strong> {artwork.culture || 'Not specified'}</p>
        <p><strong>Description:</strong> {artwork.description || 'No description available'}</p>
        <button onClick={onAdd}>Add to Collection</button>
      </div>
    </div>
  );
};

export default ArtworkModal;
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

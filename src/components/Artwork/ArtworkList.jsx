import React from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkList = ({ artworks, onArtworkClick }) => {
  return (
    <div className="artwork-grid">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={() => onArtworkClick(artwork)}
        />
      ))}
    </div>
  );
};

export default ArtworkList;


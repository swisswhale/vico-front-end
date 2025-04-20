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

/*
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';

import { fetchHarvardArtworks } from '../../services/harvardService';
import { addArtworkToCollection } from '../../services/collectionService';

const SearchArtwork = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [modalArtwork, setModalArtwork] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      fetchHarvardArtworks(search)
        .then(data => {
          setSearchResults(data.records || []);
        })
        .catch(error => {
          console.error('Error fetching artwork:', error);
        });
    }
  }, [location.search, searchParams]);

  const handleAddToCollection = async (artwork) => {
    try {
      const collectionId = searchParams.get('collection');

      if (!artwork || !artwork.id || !collectionId) {
        console.error("🛑 Invalid artwork or missing collection ID");
        return;
      }

      const payload = {
        title: artwork.title || artwork.title_display || 'Untitled',
        harvardId: artwork.id,
        artist: artwork.people?.[0]?.name || 'Unknown',
        medium: artwork.medium || '',
        dimensions: artwork.dimensions || '',
        imageUrl: artwork.primaryimageurl || '',
        date: artwork.dated || '',
        culture: artwork.culture || '',
        period: artwork.period || '',
        department: artwork.department || '',
        division: artwork.division || '',
        classification: artwork.classification || '',
        technique: artwork.technique || '',
      };

      const response = await addArtworkToCollection(collectionId, payload);
      console.log('✅ Artwork added:', response);
    } catch (error) {
      console.error('❌ Error in handleAddToCollection:', error);
    }
  };

  return (
    <div>
      <h2>Search Results</h2>
      <div className="artwork-grid">
        {searchResults.map((artwork) => (
          <div
            key={artwork.id}
            className="artwork-thumbnail"
            onClick={() => setModalArtwork(artwork)}
            style={{ cursor: 'pointer', marginBottom: '1rem' }}
          >
            {artwork.primaryimageurl && (
              <img src={artwork.primaryimageurl} alt={artwork.title} style={{ width: '200px' }} />
            )}
            <p><strong>{artwork.title}</strong></p>
            <p>{artwork.people?.[0]?.name || 'Unknown'}</p>
          </div>
        ))}
      </div>

      {modalArtwork && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modalArtwork.title}</h3>
            {modalArtwork.primaryimageurl && (
              <img src={modalArtwork.primaryimageurl} alt={modalArtwork.title} style={{ maxWidth: '100%' }} />
            )}
            <ul>
              <li><strong>Artist:</strong> {modalArtwork.people?.[0]?.name || 'Unknown'}</li>
              <li><strong>Date:</strong> {modalArtwork.dated}</li>
              <li><strong>Medium:</strong> {modalArtwork.medium}</li>
              <li><strong>Dimensions:</strong> {modalArtwork.dimensions}</li>
              <li><strong>Culture:</strong> {modalArtwork.culture}</li>
              <li><strong>Period:</strong> {modalArtwork.period}</li>
              <li><strong>Department:</strong> {modalArtwork.department}</li>
              <li><strong>Division:</strong> {modalArtwork.division}</li>
              <li><strong>Classification:</strong> {modalArtwork.classification}</li>
              <li><strong>Technique:</strong> {modalArtwork.technique}</li>
            </ul>
            <button onClick={() => handleAddToCollection(modalArtwork)}>➕ Add to Collection</button>
            <button onClick={() => setModalArtwork(null)}>❌ Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchArtwork;
*/
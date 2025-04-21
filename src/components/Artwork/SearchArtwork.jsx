import React, { useState } from 'react';
import { fetchHarvardArtworks } from '../../services/harvardService';
import { addArtworkToCollection } from '../../services/collectionService';
import ArtworkList from './ArtworkList';
import ArtworkModal from '../../ArtworkModal';


const SearchArtwork = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      console.log('Searching for:', searchTerm);
      const data = await fetchHarvardArtworks(searchTerm);
      console.log('🎨 Harvard API response:', data);
      setResults(Array.isArray(data) ? data : data?.records || []);
    } catch (error) {
      console.error('Error fetching Harvard artworks:', error);
      setError('Failed to fetch artworks. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtworkClick = (artwork) => {
    console.log('Artwork clicked:', artwork);
    setSelectedArtwork(artwork);
  };

  const handleAddToCollection = async (artwork) => {
    try {
      await addArtworkToCollection(artwork);
      console.log('🖼️ Added to collection:', artwork);
      setSelectedArtwork(null);
    } catch (error) {
      console.error('Error adding artwork to collection:', error);
     
    }
  };

  return (
    <div className="search-artwork-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Harvard Art Museum"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ArtworkList artworks={results} onArtworkClick={handleArtworkClick} />

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onAdd={() => handleAddToCollection(selectedArtwork)}
        />
      )}
    </div>
  );
};

export default SearchArtwork;

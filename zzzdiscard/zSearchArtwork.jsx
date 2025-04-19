import React, { useState, useEffect } from 'react';
import { searchArtworks } from '../services/artworkService';

const SearchArtwork = ({ onArtworkSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setError('No authentication token found. Please log in.');
      setIsLoggedIn(false);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLoggedIn) {
      setError('Please log in to search for artworks.');
      return;
    }
    try {
      const data = await searchArtworks(query);
      setResults(data);
    } catch (error) {
      setError(`Failed to search artworks: ${error.message}`);
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <h2>Search Artwork</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for artwork"
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map(artwork => (
          <div key={artwork.id}>
            <h3>{artwork.title}</h3>
            <p>Artist: {artwork.artist}</p>
            {artwork.imageUrl && <img src={artwork.imageUrl} alt={artwork.title} style={{maxWidth: '200px'}} />}
            <button onClick={() => onArtworkSelect(artwork)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchArtwork;
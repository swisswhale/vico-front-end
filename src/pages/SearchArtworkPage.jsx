import React, { useState } from 'react';
import SearchArtwork from '../components/Artwork/SearchArtwork';

const SearchArtworkPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      // Assuming SearchArtwork component handles the actual API call
      const results = await SearchArtwork.search(query);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Artwork</h1>
      <SearchArtwork 
        onSearch={handleSearch}
        results={searchResults} 
        setResults={setSearchResults} 
      />
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && searchResults.length === 0 && (
        <p>No results found. Try a different search term.</p>
      )}
    </div>
  );
};

export default SearchArtworkPage;
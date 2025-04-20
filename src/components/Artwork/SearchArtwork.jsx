import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-dom'
import { useNavigate } from 'react-router';
import * as artworkService from '../../services/artworkService';
import * as collectionService from '../../services/collectionService';

const SearchArtwork = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { collectionId } = useParams();
  const navigate = useNavigate();

  const fetchCollectionDetails = useCallback(async () => {
    if (collectionId) {
      try {
        const collection = await collectionService.getCollection(collectionId);
        setCurrentCollection(collection);
      } catch (error) {
        console.error('Error fetching collection details:', error);
        setError('Failed to fetch collection details');
      }
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollectionDetails();
    fetchUserCollections();
  }, [fetchCollectionDetails]);

  const fetchUserCollections = async () => {
    try {
      const userCollections = await collectionService.getCollections();
      setCollections(userCollections);
    } catch (error) {
      console.error('Error fetching user collections:', error);
      setError('Failed to fetch user collections');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await artworkService.searchArtworks(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching artworks:', error);
      setError('Failed to search artworks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCollection = async (artwork) => {
    setSelectedArtwork(artwork);
    if (collectionId) {
      await confirmAddToCollection(collectionId, artwork);
    }
  };

  const confirmAddToCollection = async (targetCollectionId, artwork) => {
    try {
      await collectionService.addArtworkToCollection(targetCollectionId, artwork);
      alert('Artwork added to collection successfully!');
      setSelectedArtwork(null);
      if (collectionId) {
        navigate(`/collections/${collectionId}`);
      }
    } catch (error) {
      console.error('Error adding artwork to collection:', error);
      setError('Failed to add artwork to collection');
    }
  };

  return (
    <div className="search-artwork">
      <h2>Search Artwork</h2>
      {currentCollection && (
        <p>Adding artwork to: {currentCollection.name}</p>
      )}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for artwork"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="search-results">
          {searchResults.length === 0 ? (
            <p>No results found. Try a different search term.</p>
          ) : (
            searchResults.map((artwork) => (
              <div key={artwork.id || artwork._id} className="artwork-item">
                <img src={artwork.primaryImageSmall} alt={artwork.title} />
                <h3>{artwork.title}</h3>
                <p>{artwork.artistDisplayName || artwork.artist}</p>
                <p>Date: {artwork.date}</p>
                <p>Medium: {artwork.medium}</p>
                <p>Dimensions: {artwork.dimensions}</p>
                <button onClick={() => handleAddToCollection(artwork)}>
                  {collectionId ? 'Add to This Collection' : 'Add to Collection'}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {selectedArtwork && !collectionId && (
        <div className="collection-selection">
          <h3>Select a collection to add the artwork to:</h3>
          {collections.map((collection) => (
            <button 
              key={collection._id} 
              onClick={() => confirmAddToCollection(collection._id, selectedArtwork)}
            >
              {collection.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchArtwork;
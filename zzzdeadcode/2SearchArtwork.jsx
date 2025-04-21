
/*import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchHarvardArtworks } from '../../services/harvardService';
import { addArtworkToCollection } from '../../services/collectionService';
import ArtworkList from './ArtworkList';
import ArtworkModal from '../../ArtworkModal';

const SearchArtwork = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [collectionId, setCollectionId] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const collectionParam = searchParams.get('collection');
    if (collectionParam) {
      setCollectionId(collectionParam);
    }
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchHarvardArtworks(searchTerm);
      console.log('🎨 Harvard API response:', data);
      setResults(data.records || []);
    } catch (error) {
      console.error('❌ Error fetching Harvard artworks:', error);
    }
  };

  const handleAddToCollection = async (artwork) => {
    if (!artwork || !collectionId) {
      console.error('🛑 Invalid artwork or missing collection ID');
      return;
    }

    try {
      const newArtwork = {
        title: artwork.title,
        artist: artwork.people?.[0]?.name || 'Unknown',
        description: artwork.description || '',
        date: artwork.dated || '',
        medium: artwork.medium || '',
        culture: artwork.culture || '',
        technique: artwork.technique || '',
        dimensions: artwork.dimensions || '',
        image: artwork.primaryimageurl || '',
        harvardId: artwork.id,
      };

      const response = await addArtworkToCollection(collectionId, newArtwork);
      console.log('✅ Artwork added:', response);
    } catch (error) {
      console.error('❌ Error in handleAddToCollection:', error);
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

      <ArtworkList artworks={results} onSelect={setSelectedArtwork} />

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

export default SearchArtwork;*/
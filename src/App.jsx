import { useState, useContext, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';

import NavBar from './components/Shared/NavBar.jsx';
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/DashBoard.jsx';
import CollectionList from './components/Collection/CollectionList.jsx';
import SignUpForm from './components/Auth/SignUpForm.jsx';
import SignInForm from './components/Auth/SignInForm.jsx';
import SearchArtwork from './components/Artwork/SearchArtwork.jsx';
import EditCollectionForm from './components/Collection/EditCollectionForm.jsx';

import { UserContext } from './context/UserContext.jsx';
import * as vicoService from './services/vicoService.js';
import * as collectionService from './services/collectionService.js';

import image from './assets/artbackground.png';

function App() {
  const myStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  }

  const { user } = useContext(UserContext);
  const [artworks, setArtworks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllData = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const [artworkData, collectionsData] = await Promise.all([
        vicoService.index(),
        collectionService.getCollections()
      ]);
      setArtworks(Array.isArray(artworkData) ? artworkData : []);
      setCollections(Array.isArray(collectionsData) ? collectionsData : []);
      console.log('Fetched collections:', collectionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleRefresh = useCallback(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div style={myStyle}>
      <NavBar />
      <h1>The Visual Conversation</h1>
      {error && <p className="error-message">{error}</p>}
      {isLoading && <p>Loading...</p>}
      <button onClick={handleRefresh}>Refresh Data</button>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route
              path='/collections'
              element={
                <CollectionList 
                  artCollections={collections} 
                  setArtCollections={setCollections}
                  onRefresh={handleRefresh}
                />
              }
            />
            <Route path='/artwork' element={<div>Artwork Component</div>} />
            <Route
              path='/collections/:collectionId/edit'
              element={<EditCollectionForm onRefresh={handleRefresh} />}
            />
            <Route 
              path="/collections/:collectionId/add-artwork" 
              element={<SearchArtwork onRefresh={handleRefresh} artworks={artworks} />} 
            />
          </>
        ) : (
          <>
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='/signin' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
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

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

function App() {
  const myStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  }

  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await vicoService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };
    
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div style={myStyle}>
        <NavBar />
        <h1>The Visual Conversation</h1>
        {error && <p className="error-message">{error}</p>}
        {isLoading && <p>Loading...</p>}
        <button onClick={handleRefresh}>Refresh Data</button>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <CollectionList
                  artCollections={collections}
                  setArtCollections={setCollections}
                  onRefresh={handleRefresh}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collections/:collectionId/edit"
            element={
              <ProtectedRoute>
                <EditCollectionForm onRefresh={handleRefresh} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collections/:collectionId/add-artwork"
            element={
              <ProtectedRoute>
                <SearchArtwork onRefresh={handleRefresh} artworks={artworks} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
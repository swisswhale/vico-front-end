import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/Shared/NavBar.jsx';
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/DashBoard.jsx';
import CollectionList from './components/Collection/CollectionList.jsx';
import SignUpForm from './components/Auth/SignUpForm.jsx';
import SignInForm from './components/Auth/SignInForm.jsx';

import { UserContext } from './context/UserContext.jsx';
import * as vicoService from './services/vicoService.js';

import image from './assets/artbackground.png';

function App() {
  const myStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  }

  const { user } = useContext(UserContext);
  const [artCollections, setArtCollections] = useState([]);

  useEffect(() => {
    const fetchAllArtwork = async () => {
      try {
        const artworkData = await vicoService.index();
        setArtCollections(artworkData);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    if (user) fetchAllArtwork();
  }, [user]);

  return (
    <div style={myStyle}>
      <NavBar />
      <h1>The Visual Conversation</h1>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route 
              path='/collections' 
              element={<CollectionList artCollections={artCollections} />} 
            />
            <Route path='/artwork' element={<div>Artwork Component</div>} />
            <Route path='/collections/new' element={<div>New Collection Form</div>} />
            <Route 
              path='/collections/:collectionId/edit' 
              element={<div>Edit Collection Form</div>} 
            />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
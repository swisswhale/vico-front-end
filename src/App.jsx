import { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router';

import { BrowserRouter } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/DashBoard.jsx';
import CollectionList from './pages/CollectionList/CollectionList.jsx';
import { UserContext } from './context/UserContext.jsx';
import SignUpForm from './components/Sign-Up/SignUpForm.jsx';
import SignInForm from './components/Sign-In/SignInForm.jsx';

import * as vicoService from './services/vicoService.js';


function App() {

  // const { user } = useContext(UserContext);
  const user = {};
  const [artcollections, setArtCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchAllArtwork = async () => {
      const artworkData = await vicoService.index();
      setArtwork(artworkData);
    };
    if (user) fetchAllArtwork();
  }, [user]);




  return (
    <>
  
   <NavBar />
    <h1>The Visual Conversation</h1>
    <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/collections' element={<CollectionList />} />
            <Route
              path='/artwork'
              
            />
            <Route
              path='/collections/new'
              
            />
            <Route
              path='/collections/:collectionId/edit'
              
            />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App

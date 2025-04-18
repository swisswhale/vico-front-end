import { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router';

import { BrowserRouter } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import NavBar from './components/Shared/NavBar.jsx';
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/DashBoard.jsx';
import CollectionList from './components/Collection/CollectionList.jsx';
import { UserContext } from './context/UserContext.jsx';
import SignUpForm from './components/Auth/SignUpForm.jsx';
import SignInForm from './components/Auth/SignInForm.jsx';
import image from './assets/artbackground.png';

import * as vicoService from './services/vicoService.js';


function App() {
  const myStyle= {
    backgroundImage: `url(${image})`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
  }

  const { user } = useContext(UserContext);
  // const user = {};
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
   <div style={myStyle}>
   <NavBar />
    <h1>The Visual Conversation</h1>
    <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/collections' element={<CollectionList 
              // artCollection={}
            />} />
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
      </div>
    </>
  );
};

export default App

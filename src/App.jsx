import { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router';

import { BrowserRouter } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/Dashboard/DashBoard.jsx';
import ArtCollectionList from './components/ArtCollectionList/ArtCollectionList.jsx';
import { UserContext } from './context/UserContext.jsx';
import SignUpForm from './components/Sign-Up/SignUpForm.jsx';
import SignInForm from './components/Sign-In/SignInForm.jsx';

import * as vicoService from './services/vicoService.js';


function App() {

  const { user } = useContext(UserContext);
  const [artcollections, setArtCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchAllArtCollections = async () => {
      const artCollectionsData = await vicoService.index();
      setArtCollections(artCollectionsData);
    };
    if (user) fetchAllArtCollections();
  }, [user]);




  return (
    <>
  
   <NavBar />
    <h1>The Visual Conversation</h1>
    <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/artcollections' element={< ArtCollectionList />} />
            <Route
              path='/artcollections/:artcollectionId'
              
            />
            <Route
              path='/artcollections/new'
              
            />
            <Route
              path='/artcollections/:artcollectionId/edit'
              
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

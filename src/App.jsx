import { useState } from 'react'
import { Routes, Route, useNavigate} from 'react-router'
import { useContext, useEffect} from 'react'

import { BrowserRouter } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar/NavBar.jsx'


function App() {
  return (
    <>
  
   {/* <NavBar /> */}
    <h1>The Visual Conversation</h1>
    <Routes>
      <Route path='/' element={<h3>Home</h3>}></Route>
      <Route path='/artcollection'>Art Gallery</Route>
      <Route path='/artcollection/new'>Add to Collection</Route>
      <Route path='/theconversation'>Lets Talk </Route>

    </Routes>

    
    </>
  )
};

export default App

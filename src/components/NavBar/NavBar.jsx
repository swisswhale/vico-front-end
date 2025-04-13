import React, { useContext }  from 'react';
import { Link } from 'react-router';


import { UserContext } from '../../context/UserContext'



const NavBar = () => {

    const {user, setUser} = useContext(UserContext);

  
    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }



    return (
      <>
        <nav>
      {user ? (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/artcollection'>Art Collection</Link></li>
          <li><Link to='/artcollection/new'>Add To Collection</Link></li>
          <li><Link to='' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
    </>
    );
};


export default NavBar;
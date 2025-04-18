import { UserContext } from '../../context/UserContext'
import React, { useContext } from 'react';
import { Link } from 'react-router';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <nav>
            {user ? (
                <ul className="navbar">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/collections'>Art Collection</Link></li>
                    <li><Link to='/artwork'>Search Artwork</Link></li>
                    <li><Link to='' onClick={handleSignOut}>Sign Out</Link></li>
                </ul>
            ) : (
                <ul className="navbar">
                    <li><Link to='/sign-in'>Sign In</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
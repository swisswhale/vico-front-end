import { UserContext } from '../../context/UserContext'
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    }

    return (
        <nav>
            <ul className="navbar">
                <li><Link to='/'>Home</Link></li>
                {user ? (
                    <>
                        <li><Link to='/collections'>Art Collection</Link></li>
                        <li><Link to='/artwork'>Search Artwork</Link></li>
                        <li><Link to='' onClick={(e) => { e.preventDefault(); handleSignOut(); }}>Sign Out</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/signin'>Sign In</Link></li>
                        <li><Link to='/signup'>Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
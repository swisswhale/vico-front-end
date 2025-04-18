import { Link } from 'react-router';

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import * as userService from '../../services/userService';

const ArtworkList = () => {
  const { user } = useContext(UserContext);
  return (
  <main>
    

    {artwork.map((art)=> (
   <Link key={art._id} to={`/artwork/${art._id}`}>
    <article>
        <header>
            <h2>{art.title} by {art.artist}</h2>
            <p>
                {`${art.author.username} posted on 
                ${new Date(art.createdAt).toLocaleDateString()}`}
            </p>
        </header>
        <p>{art.description}</p>
    </article>
   </Link>
    ))}
  </main>
  );
};

export default ArtworkList;
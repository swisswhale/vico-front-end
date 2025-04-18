import { Link } from 'react-router';

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import * as userService from '../../services/userService';

const CollectionList = (props) => {
  const { user } = useContext(UserContext);
  return (
  <main>
    

    {props.artCollections.map((collection)=> (
   <Link key={collection._id} to={`/collections/${collection._id}`}>
    <article>
        <header>
            <h2>{collection.title}</h2>
            <p>
                {`${collection.author.username} posted on 
                ${new Date(collection.createdAt).toLocaleDateString()}`}
            </p>
        </header>
        <p>{collection.text}</p>
    </article>
   </Link>
    ))}
  </main>
  );
};

export default CollectionList;
import React, { useState, useEffect } from 'react';
import CreateCollectionForm from './CreateCollectionForm';
import * as collectionService from '../../services/collectionService.js';

const CollectionList = () => {
  const [artCollections, setArtCollections] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collections = await collectionService.getCollections();
        setArtCollections(collections);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch collections: ' + err.message);
        setIsLoading(false);
      }
    };
  
    fetchCollections();
  }, []);

  const handleAddCollection = () => {
    setIsFormVisible(true);
  };

  const handleCollectionCreated = (newCollection) => {
    setArtCollections(prevCollections => [...prevCollections, newCollection]);
    setIsFormVisible(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="collection-list">
      <h2>Your Collections</h2>
      <button onClick={handleAddCollection}>Add New Collection</button>
      
      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <CreateCollectionForm 
              onCollectionCreated={handleCollectionCreated}
              onClose={() => setIsFormVisible(false)}
            />
          </div>
        </div>
      )}

      {artCollections.length === 0 ? (
        <p>You don't have any collections yet. Create one!</p>
      ) : (
        artCollections.map(collection => (
          <div key={collection._id} className="collection-item">
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionList;


// updated debug

/*
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
*/
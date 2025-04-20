import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import CreateCollectionForm from './CreateCollectionForm';
import EditCollectionForm from './EditCollectionForm';
import CollectionDetails from './CollectionDetails'; // New component
import Modal from '../Modal.jsx';
import * as collectionService from '../../services/collectionService';

const CollectionList = ({ artCollections, setArtCollections, onRefresh }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = useCallback(async () => {
    console.log('Fetching collections...');
    try {
      setIsLoading(true);
      const collections = await collectionService.getCollections();
      console.log('Fetched collections:', collections);
      setArtCollections(Array.isArray(collections) ? collections : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError('Failed to fetch collections: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setArtCollections]);

  useEffect(() => {
    console.log('CollectionList mounted or updated');
    fetchCollections();
  }, [fetchCollections]);

  const handleCollectionCreated = (newCollection) => {
    setArtCollections(prevCollections => [...prevCollections, newCollection]);
    setIsCreateModalOpen(false);
    onRefresh(); // Refresh the main artwork data
  };

  const handleDeleteCollection = async (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await collectionService.deleteCollection(collectionId);
        setArtCollections(prevCollections => 
          prevCollections.filter(c => c._id !== collectionId)
        );
        setError(null);
        onRefresh(); // Refresh the main artwork data
      } catch (err) {
        console.error('Error deleting collection:', err);
        setError('Failed to delete collection: ' + err.message);
      }
    }
  };

  const handleRefresh = () => {
    fetchCollections();
    onRefresh(); // Refresh the main artwork data
  };

  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setIsEditModalOpen(true);
  };

  const handleCollectionUpdated = (updatedCollection) => {
    setArtCollections(prevCollections =>
      prevCollections.map(c => c._id === updatedCollection._id ? updatedCollection : c)
    );
    setIsEditModalOpen(false);
    onRefresh(); // Refresh the main artwork data
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };

  return (
    <div className="collection-list">
      <h2>Your Collections</h2>
      <button onClick={() => setIsCreateModalOpen(true)}>Add New Collection</button>
      <button onClick={handleRefresh}>Refresh Collections</button>
      
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateCollectionForm 
          onCollectionCreated={handleCollectionCreated}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditCollectionForm 
          collection={editingCollection}
          onCollectionUpdated={handleCollectionUpdated}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {isLoading ? (
        <p>Loading collections...</p>
      ) : error ? (
        <div>
          Error: {error} <button onClick={handleRefresh}>Retry</button>
        </div>
      ) : !artCollections || artCollections.length === 0 ? (
        <p>You don't have any collections yet. Create one!</p>
      ) : (
        artCollections.map(collection => (
          <div key={collection._id} className="collection-item">
            <h3 onClick={() => handleCollectionClick(collection)} style={{cursor: 'pointer'}}>
              {collection.name}
            </h3>
            <p>{collection.description}</p>
            <Link to={`/collections/${collection._id}/add-artwork`}>Add Artwork</Link>
            <button onClick={() => handleEditCollection(collection)}>Edit</button>
            <button onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
          </div>
        ))
      )}

      {selectedCollection && (
        <CollectionDetails
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}
    </div>
  );
};

export default CollectionList;
/*
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CreateCollectionForm from './CreateCollectionForm';
import EditCollectionForm from './EditCollectionForm'; // Make sure to create this component
import Modal from '../Modal.jsx';
import * as collectionService from '../../services/collectionService';

const CollectionList = ({ artCollections, setArtCollections, onRefresh }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = useCallback(async () => {
    console.log('Fetching collections...');
    try {
      setIsLoading(true);
      const collections = await collectionService.getCollections();
      console.log('Fetched collections:', collections);
      setArtCollections(Array.isArray(collections) ? collections : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError('Failed to fetch collections: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setArtCollections]);

  useEffect(() => {
    console.log('CollectionList mounted or updated');
    fetchCollections();
  }, [fetchCollections]);

  const handleCollectionCreated = (newCollection) => {
    setArtCollections(prevCollections => [...prevCollections, newCollection]);
    setIsCreateModalOpen(false);
    onRefresh(); // Refresh the main artwork data
  };

  const handleDeleteCollection = async (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await collectionService.deleteCollection(collectionId);
        setArtCollections(prevCollections => 
          prevCollections.filter(c => c._id !== collectionId)
        );
        setError(null);
        onRefresh(); // Refresh the main artwork data
      } catch (err) {
        console.error('Error deleting collection:', err);
        setError('Failed to delete collection: ' + err.message);
      }
    }
  };

  const handleRefresh = () => {
    fetchCollections();
    onRefresh(); // Refresh the main artwork data
  };

  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setIsEditModalOpen(true);
  };

  const handleCollectionUpdated = (updatedCollection) => {
    setArtCollections(prevCollections =>
      prevCollections.map(c => c._id === updatedCollection._id ? updatedCollection : c)
    );
    setIsEditModalOpen(false);
    onRefresh(); // Refresh the main artwork data
  };

  console.log('Rendering CollectionList. artCollections:', artCollections);

  return (
    <div className="collection-list">
      <h2>Your Collections</h2>
      <button onClick={() => setIsCreateModalOpen(true)}>Add New Collection</button>
      <button onClick={handleRefresh}>Refresh Collections</button>
      
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateCollectionForm 
          onCollectionCreated={handleCollectionCreated}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditCollectionForm 
          collection={editingCollection}
          onCollectionUpdated={handleCollectionUpdated}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {isLoading ? (
        <p>Loading collections...</p>
      ) : error ? (
        <div>
          Error: {error} <button onClick={handleRefresh}>Retry</button>
        </div>
      ) : !artCollections || artCollections.length === 0 ? (
        <p>You don't have any collections yet. Create one!</p>
      ) : (
        artCollections.map(collection => (
          <div key={collection._id} className="collection-item">
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
            <Link to={`/collections/${collection._id}/add-artwork`}>Add Artwork</Link>
            <button onClick={() => handleEditCollection(collection)}>Edit</button>
            <button onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionList;
*/
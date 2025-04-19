import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateCollectionForm from './CreateCollectionForm';
import EditCollectionForm from './EditCollectionForm';
import Modal from '../Modal.jsx';
import * as collectionService from '../../services/collectionService';

const CollectionList = () => {
  const [artCollections, setArtCollections] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollections();
  }, []);

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

  const handleCollectionCreated = (newCollection) => {
    setArtCollections(prevCollections => [...prevCollections, newCollection]);
    setIsCreateModalOpen(false);
  };

  const handleCollectionUpdated = async (updatedCollection) => {
    try {
      const updated = await collectionService.updateCollection(updatedCollection._id, updatedCollection);
      setArtCollections(prevCollections => 
        prevCollections.map(c => c._id === updated._id ? updated : c)
      );
      setEditingCollection(null);
    } catch (err) {
      setError('Failed to update collection: ' + err.message);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await collectionService.deleteCollection(collectionId);
        setArtCollections(prevCollections => 
          prevCollections.filter(c => c._id !== collectionId)
        );
      } catch (err) {
        setError('Failed to delete collection: ' + err.message);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="collection-list">
      <h2>Your Collections</h2>
      <button onClick={() => setIsCreateModalOpen(true)}>Add New Collection</button>
      
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateCollectionForm 
          onCollectionCreated={handleCollectionCreated}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={!!editingCollection} onClose={() => setEditingCollection(null)}>
        {editingCollection && (
          <EditCollectionForm 
            collection={editingCollection}
            onCollectionUpdated={handleCollectionUpdated}
            onClose={() => setEditingCollection(null)}
          />
        )}
      </Modal>

      {artCollections.length === 0 ? (
        <p>You don't have any collections yet. Create one!</p>
      ) : (
        artCollections.map(collection => (
          <div key={collection._id} className="collection-item">
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
            <Link to={`/collections/${collection._id}/add-artwork`}>Add Artwork</Link>
            <button onClick={() => setEditingCollection(collection)}>Edit</button>
            <button onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CollectionList;
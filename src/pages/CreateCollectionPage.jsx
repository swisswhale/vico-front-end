import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext.jsx';
import * as collectionService from '../../src/services/collectionService.js';

const CreateCollectionPage = () => {
    const [formData, setFormData] = useState({
        name:'',
        description:''
    });
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) {
            setError('Collection is required');
            return;
        }

        try {
            const newCollection = await collectionService.createCollection(formData);
            console.log('New collection created:', newCollection);
            navigate('/collections'); 
        } catch (err) {
            console.error('Error creating collection:', err);
            setError(err.message || 'An eror occured while creating the collection');
        }
    };

    if (!user) {
        return <div>Please log in to create a collection.</div>;
    }

    return (
        <div className='create-collection-page'>
            <h2>Create New Collection</h2>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Collection Name</label>
                    <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    />
                </div>
                <button type="submit">Create Collection</button>
            </form>
        </div>
    );
};

export default CreateCollectionPage
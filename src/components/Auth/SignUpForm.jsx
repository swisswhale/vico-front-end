import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await signUp(formData);
            console.log('Signed up successfully:', user);
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message || 'An error occurred during sign up');
        }
    };

    return (
        <div className='authcontainer'>
        <form onSubmit={handleSubmit}>
            <h2 className='signup'>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Username'
                    autoComplete='off'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    autoComplete='off'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
            <button onClick={() => {navigate('/')}}>Back</button>
        </form>
        </div>
    );
};

export default SignUpForm;
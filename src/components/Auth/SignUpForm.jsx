import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService'
import { UserContext } from '../../context/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        setUser(user);
        navigate('/collections');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create an Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth-submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
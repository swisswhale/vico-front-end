import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
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
        navigate('/');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="authcontainer">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create an Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-form-group">
          <label htmlFor="username" className='labels'>Username</label>
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
          <label htmlFor="password" className='labels'>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='labels'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../context/UserContext';

const SignInForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setMessage('');
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            console.log('Attempting to sign in with:', formData);
            const response = await signIn(formData);
            console.log('Sign in response:', response);
            if (response && response.user) {
                console.log('Sign in successful:', response.user);
                setUser(response.user);
                navigate('/');
            } else {
                console.error('Unexpected response structure:', response);
                setMessage('An unexpected error occurred');
            }
        } catch (error) {
            console.error('Signin error in component:', error);
            console.error('Full error object:', JSON.stringify(error, null, 2));
            setMessage(error.message);
        }
    };

    return (
        <main>
            <div className='authcontainer'>
                <h1 className='signup'>Sign In</h1>
                {message && <p className="error-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type='text'
                            id='username'
                            value={formData.username}
                            name='username'
                            placeholder="Username"
                            autoComplete='username'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type='password'
                            id='password'
                            value={formData.password}
                            name='password'
                            placeholder="Password"
                            autoComplete='current-password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Log In</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </form>
            </div>
        </main>
    );
};

export default SignInForm;
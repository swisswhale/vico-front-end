import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../context/UserContext';


const SignInForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event) => {
       setMessage('');
       setFormData({...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
       event.preventDefault();
       try {
        const userSignedIn = await signIn(formData);
        setUser(userSignedIn);
        navigate('/');
       } catch (error) {
    console.log(error);
    setMessage(error.message);
       }
    };




    return (
        <main>
            <h1>Sign In</h1>
            <p>{message}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username:</label>
                        <input 
                        type='text'
                        id='username'
                        value={formData.username}
                        name='username'
                        placeholder="Username"
                        autoComplete='off'
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input 
                        type='text'
                        id='passowrd'
                        value={formData.password}
                        name='password'
                        placeholder="Password"
                        autoComplete='off'
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <input 
                        type='text'
                        id='confirmPassowrd'
                        value={formData.confirmPassword}
                        name='confirmPassword'
                        placeholder="Confirm Password"
                        autoComplete='off'
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <button>Log In</button>
                    <button onClick={()=> navigate('/')}>Cancel</button>
                </form>
        </main>

    )
};


export default SignInForm;
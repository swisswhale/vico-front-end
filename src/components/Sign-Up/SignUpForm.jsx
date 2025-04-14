import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signUp } from '../../services/authService';

import { UserContext } from '../../context/UserContext';

const SignUpForm = () => {
 const navigate = useNavigate();
 const { setUser } = useContext(UserContext);
 const [message, setMessage] = useState('');
 const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
 });

 const { email, username, password, confirmPassword } = formData;

 const handleChange = async (event) => {
    setMessage('');
    setFormData({... formData, [event.target.name]: event.target.value } );
 };

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {

  } catch (error) {
  console.log(error);
  setMessage(error.message)
  } event.preventDefault();
  try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
  } catch (error) {
      console.log(error);
      setMessage(error.message);
  }
 };

 const isFormValid = () => {
  return !(username && password && password === confirmPassword );
 };





    return (
   <main>
    <h1>Sign Up</h1>
    <p>{message}</p>
    <form onSubmit={handleSubmit}>
    <div>
            <label htmlFor='email'>Email:</label>
            <input 
            type='text'
            id='email'
            value={email}
            name='email'
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor='username'>Username:</label>
            <input 
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
            />
        </div>
        <div>
           <label htmlFor='password'>Password:</label>
           <input
           type='text' 
           id='password'
           value={password}
           name='password'
           onChange={handleChange}
           required
           />
        </div>
        <div>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input
            type='text'
            id='confirmPassword' 
            value={confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <button disabled={isFormValid()}>Sign Up</button>
            <button onClick={() => navigate('/')}>Cancel</button>
         </div>
    </form>
   </main>
    );
};

export default SignUpForm;
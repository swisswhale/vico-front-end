import { setToken, removeToken, getToken } from './tokenService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const handleResponse = async (res) => {
    const data = await res.json();
    console.log('Full response:', res);
    console.log('Response data:', data);
    if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
    }
    return data;
};

const signUp = async (formData) => {
    try {
        console.log('Sending signup request with data:', formData);
        const res = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await handleResponse(res);
        console.log('Signup response data:', data);

        if (data.token) {
            setToken(data.token);
            const user = parseUserFromToken(data.token);
            console.log('Parsed user from token:', user);
            return user;
        } else {
            console.error('No token in response:', data);
            throw new Error('Invalid response from server: No token received');
        }
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

const signIn = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await handleResponse(res);
      console.log('Signin response data:', data);
      if (data.token) {
        setToken(data.token);
        const user = parseUserFromToken(data.token);
        console.log('Parsed user from token:', user);
        return { user };
      }
      throw new Error('Invalid response from server');
    } catch (error) {
        console.error('Signin error:', error);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        if (error.message === 'Invalid username or password') {
            throw new Error('Invalid username or password. Please try again.');
        }
        throw new Error('An error occurred during sign in. Please try again later.');
    }
};

const signOut = () => {
    removeToken();
};

const parseUserFromToken = (token) => {
    try {
        console.log('Parsing token:', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded payload:', payload);
        if (payload.userId && payload.username) {
            return {
                id: payload.userId,
                username: payload.username
            };
        } else {
            console.error('Unexpected payload structure:', payload);
            return null;
        }
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};

const getUser = () => {
    const token = getToken();
    return token ? parseUserFromToken(token) : null;
};

const checkSession = async () => {
    const token = getToken();
    if (!token) return null;

    try {
        const res = await fetch(`${BASE_URL}/check-session`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            removeToken();
            return null;
        }

        return parseUserFromToken(token);
    } catch (error) {
        console.error('Check session error:', error);
        removeToken();
        return null;
    }
};

export {
    signUp,
    signIn,
    signOut,
    getUser,
    checkSession
};
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
    try {
        console.log('Sending signup request with data:', formData);
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Signup error:', errorData);
            throw new Error(errorData.message || 'Signup failed');
        }

        const data = await res.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            return data.user;
        }

        throw new Error('Invalid response from server');
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

const signIn = async (formData) => {
    try {
        console.log('Sending signin request with data:', formData);
        const res = await fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Signin error:', errorData);
            throw new Error(errorData.message || 'Signin failed');
        }

        const data = await res.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            return data.user;
        }

        throw new Error('Invalid response from server');
    } catch (error) {
        console.error('Signin error:', error);
        throw error;
    }
};

export {
    signUp,
    signIn,
};
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Register user
const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        if (response.data) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

// Login user
const login = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        if (response.data) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

const authService = {
    register,
    login,
};

export default authService;

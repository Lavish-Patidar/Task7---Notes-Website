import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Get all notes
const getNotes = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Create new note
const createNote = async (noteData) => {
    try {
        const response = await api.post('/', noteData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Get single note
const getNote = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Update note
const updateNote = async (id, noteData) => {
    try {
        const response = await api.put(`/${id}`, noteData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Delete note
const deleteNote = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const noteService = {
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote,
};

export default noteService;

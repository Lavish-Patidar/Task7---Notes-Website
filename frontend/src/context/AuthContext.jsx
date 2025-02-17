import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await authService.login(credentials);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
            return userData;
        } catch (error) {
            setError(error.message || 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const registeredUser = await authService.register(userData);
            setUser(registeredUser);
            localStorage.setItem('user', JSON.stringify(registeredUser));
            navigate('/');
            return registeredUser;
        } catch (error) {
            setError(error.message || 'Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

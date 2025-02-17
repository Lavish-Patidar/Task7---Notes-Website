import React from 'react';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                {user ? `Welcome back, ${user.name}!` : 'Welcome to Notes App'}
            </Typography>
            <Typography variant="body1">
                {user ? 'Manage your notes efficiently with our simple and intuitive interface.'
                    : 'Please login or register to start using the app.'}
            </Typography>

        </Container>
    );
};

export default HomePage;

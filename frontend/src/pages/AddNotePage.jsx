import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import noteService from '../api/noteService';


const AddNotePage = () => {
    const { user } = useAuth();
    const [note, setNote] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('Please login to add notes');
            return;
        }

        try {
            await noteService.createNote({
                ...note,
                userId: user._id // Include user ID with the note
            });
            setNote({ title: '', content: '' });
            setError('');
        } catch (error) {
            setError(error.message || 'Failed to save note. Please try again.');
        }

    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Note
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Content"
                    name="content"
                    value={note.content}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                />
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save Note
                </Button>
            </Box>
        </Container>
    );
};

export default AddNotePage;

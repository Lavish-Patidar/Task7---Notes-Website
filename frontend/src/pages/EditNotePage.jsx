import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import noteService from '../api/noteService';
import { useAuth } from '../context/AuthContext';

const EditNotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [note, setNote] = useState({
        title: '',
        content: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNote = async () => {
            if (!user) {
                setError('Please login to edit notes');
                return;
            }

            try {
                const fetchedNote = await noteService.getNote(id);
                setNote({
                    title: fetchedNote.title,
                    content: fetchedNote.content
                });
            } catch (error) {
                setError('Failed to fetch note. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id, user]);

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await noteService.updateNote(id, note);
            navigate('/view-notes');
        } catch (error) {
            setError('Failed to update note. Please try again.');
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Note
            </Typography>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleSubmit}>
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
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Update Note
                </Button>
            </form>
        </Container>
    );
};

export default EditNotePage;

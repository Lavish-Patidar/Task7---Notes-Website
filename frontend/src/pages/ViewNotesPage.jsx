import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import noteService from '../api/noteService';

const ViewNotesPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!user) {
                setError('Please login to view your notes');
                return;
            }

            try {
                const notes = await noteService.getNotes();
                setNotes(notes);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch notes. Please try again.');
                setLoading(false);
            }
        };

        fetchNotes();
    }, [user]);

    const handleEdit = async (noteId) => {
        if (!noteId) {
            setError('Invalid note ID');
            return;
        }
        try {
            const note = await noteService.getNote(noteId);
            navigate(`/${noteId}`, { state: { note } });
        } catch (error) {
            setError('Failed to fetch note for editing');
        }
    };

    const handleDelete = async (noteId) => {
        if (!noteId) {
            setError('Invalid note ID');
            return;
        }

        if (window.confirm('Are you sure you want to delete this note?')) {
            setProcessing(true);
            try {
                await noteService.deleteNote(noteId);
                setNotes(notes.filter(note => note._id !== noteId));
            } catch (error) {
                setError('Failed to delete note. Please try again.');
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, px: { xs: 2, sm: 3, md: 4 } }}>

            <Typography variant="h4" component="h1" gutterBottom>
                Your Notes
            </Typography>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ mt: 2 }}>
                    {notes.length > 0 ? (
                        <List>
                            {notes.map((note) => (
                                <ListItem
                                    key={note._id}
                                    sx={{
                                        borderBottom: '1px solid #ddd',
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        justifyContent: 'space-between',
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        py: 2,
                                        gap: { xs: 1, sm: 0 }
                                    }}
                                >

                                    <ListItemText
                                        primary={note.title}
                                        secondary={note.content}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'row', sm: 'row' },
                                        gap: 1,
                                        mt: { xs: 1, sm: 0 }
                                    }}>

                                        <IconButton
                                            onClick={() => handleEdit(note._id)}
                                            disabled={processing}
                                            size="small"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                        >

                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(note._id)}
                                            disabled={processing}
                                            color="error"
                                            size="small"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 0, 0, 0.04)'
                                                }
                                            }}
                                        >

                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No notes found.</Typography>
                    )}
                </Box>
            )}
        </Container>
    );
};

export default ViewNotesPage;

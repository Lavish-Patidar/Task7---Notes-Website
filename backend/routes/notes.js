const express = require('express');
const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all notes for logged-in user
router.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    })
);

// Create new note
router.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { title, content } = req.body;

        const note = await Note.create({
            user: req.user._id,
            title,
            content,
        });

        res.status(201).json(note);
    })
);

// Get single note by ID
router.get(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const note = await Note.findById(req.params.id);

        if (note && note.user.toString() === req.user._id.toString()) {
            res.json(note);
        } else {
            res.status(404);
            throw new Error('Note not found');
        }
    })
);

// Update note
router.put(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const note = await Note.findById(req.params.id);

        if (note && note.user.toString() === req.user._id.toString()) {
            note.title = req.body.title || note.title;
            note.content = req.body.content || note.content;

            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404);
            throw new Error('Note not found');
        }
    })
);

// Delete note
router.delete(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const note = await Note.findById(req.params.id);

        if (note && note.user.toString() === req.user._id.toString()) {
            await Note.deleteOne({ _id: req.params.id }); // Updated to use deleteOne
            res.json({ message: 'Note removed' });
        } else {
            res.status(404);
            throw new Error('Note not found');
        }
    })
);

module.exports = router;

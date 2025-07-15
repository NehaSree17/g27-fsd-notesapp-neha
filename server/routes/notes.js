const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('./middleware/auth'); // ✅ Correct path

// 📥 Get all notes (optionally filtered by tag)
router.get('/', auth, async (req, res) => {
  try {
    const tag = req.query.tag;
    const filter = { userId: req.user.id };
    if (tag) filter.tags = tag;

    const notes = await Note.find(filter);
    res.json(notes);
  } catch (err) {
    console.error('GET /notes error:', err.message);
    res.status(500).json({ error: 'Unable to fetch notes. Please try again.' });
  }
});

// ➕ Create a new note
router.post('/', auth, async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, userId: req.user.id });
    res.status(201).json(note);
  } catch (err) {
    console.error('POST /notes error:', err.message);
    res.status(500).json({ error: 'Failed to create note. Please check your data.' });
  }
});

// ✏️ Update an existing note
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // ✅ Security: update only user's note
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Note not found or not authorized.' });
    }

    res.json(updated);
  } catch (err) {
    console.error('PUT /notes/:id error:', err.message);
    res.status(500).json({ error: 'Failed to update note. Please try again.' });
  }
});

// ❌ Delete a note
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Note not found or not authorized.' });
    }

    res.json({ success: true, message: 'Note deleted successfully.' });
  } catch (err) {
    console.error('DELETE /notes/:id error:', err.message);
    res.status(500).json({ error: 'Failed to delete note. Please try again.' });
  }
});

module.exports = router;

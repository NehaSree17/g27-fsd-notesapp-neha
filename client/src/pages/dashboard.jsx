// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import NoteFormModal from '../components/NoteFormModal';

function Dashboard({ token, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [error, setError] = useState('');

  // 🔁 Fetch Notes
  const fetchNotes = async () => {
    const url = filter === 'All' ? '/api/notes' : `/api/notes?tag=${filter}`;
    try {
      const res = await fetch(`https://g27-fsd-notesapp-neha.onrender.com${url}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        alert('Session expired. Please login again.');
        onLogout();
        return;
      }

      const data = await res.json();
      setNotes(data);
      setError('');
    } catch {
      setError('Failed to load notes.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [filter]);

  // 💾 Save New or Edited Note
  const handleSave = async (note) => {
    const isEditing = !!note._id;
    const endpoint = isEditing ? `/api/notes/${note._id}` : '/api/notes';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(`https://g27-fsd-notesapp-neha.onrender.com${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(note)
      });

      if (!res.ok) throw new Error('Failed to save note.');
      setShowForm(false);
      setEditNote(null);
      fetchNotes();
    } catch {
      alert('Could not save note.');
    }
  };

  // ❌ Delete a Note (fixed)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://g27-fsd-notesapp-neha.onrender.com/api/notes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Delete failed');
      fetchNotes();
    } catch {
      alert('Could not delete note.');
    }
  };

  const allTags = ['All', ...new Set(notes.flatMap(n => n.tags || []))];

  // 🔍 Filtered Notes (by tag search)
  const filteredNotes = notes.filter(note =>
    note.tags?.some(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>+ Add Note</button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by tag..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 border px-3 py-2 rounded"
      />

      <div className="flex gap-2 flex-wrap mb-4">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full ${filter === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {error && <p className="text-red-500 col-span-full">{error}</p>}
        {filteredNotes.length === 0 && !error ? (
          <p className="text-gray-500 col-span-full">No notes found with matching tag.</p>
        ) : (
          filteredNotes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => {
                setEditNote(note);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(note._id)}
            />
          ))
        )}
      </div>

      {showForm && (
        <NoteFormModal
          note={editNote}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditNote(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;

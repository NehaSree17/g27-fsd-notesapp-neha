import React, { useState } from 'react';
import axios from 'axios';

function AddNote({ token }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/notes/add', {
        title,
        body,
        tags: tags.split(',').map(tag => tag.trim()),
      }, {
        headers: {
          Authorization: token,
        },
      });

      alert('Note added successfully!');
      setTitle('');
      setBody('');
      setTags('');
    } catch (error) {
      alert('Failed to add note.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        required
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Add Note
      </button>
    </form>
  );
}

export default AddNote;

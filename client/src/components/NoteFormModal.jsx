import React, { useState, useEffect } from 'react';

function NoteFormModal({ note, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTags(note.tags ? note.tags.join(', ') : '');
    } else {
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...note,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{note ? 'Edit Note' : 'Add Note'}</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full mb-3 border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full mb-4 border p-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{note ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
}

export default NoteFormModal;
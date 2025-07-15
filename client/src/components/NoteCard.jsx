import React from 'react';

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="font-bold text-lg mb-1">{note.title}</h3>

      <p className="mb-2 text-gray-700">{note.content}</p>

      <div className="flex flex-wrap gap-1 text-sm text-blue-500 mb-2">
        {note.tags?.map((tag, i) => (
          <span key={i} className="bg-blue-100 px-2 py-0.5 rounded">#{tag}</span>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onEdit} className="text-yellow-600">Edit</button>
        <button onClick={onDelete} className="text-red-600">Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;

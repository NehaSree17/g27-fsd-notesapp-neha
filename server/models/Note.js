// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // 🔄 Use ObjectId for relationship
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true // createdAt and updatedAt
  }
);

// ✅ Prevent OverwriteModelError (Hot reload protection)
module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);

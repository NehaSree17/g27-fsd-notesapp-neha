// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ⬅️ Normalize email for consistency
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // optional: helps track registration time
  }
);

// ✅ Prevent OverwriteModelError (hot reload-safe)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { count: Number, lastActive: Date },
  savedPlaylists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  preferences: { categories: [String], difficulty: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
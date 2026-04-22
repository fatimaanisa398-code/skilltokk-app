const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  videos: [{ videoId: mongoose.Schema.Types.ObjectId, addedAt: Date }],
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
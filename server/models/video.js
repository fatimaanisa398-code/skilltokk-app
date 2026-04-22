const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: String,
  thumbnail: String,
  category: String,
  difficulty: { type: String, enum: ['beginner','intermediate','advanced'] },
  duration: Number,
  author: { userId: mongoose.Schema.Types.ObjectId, username: String },
  tags: [String],
  stats: { views: { type: Number, default: 0 }, likes: { type: Number, default: 0 } },
  comments: [{ userId: mongoose.Schema.Types.ObjectId, text: String, createdAt: Date }]
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
const router = require('express').Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');

router.get('/feed', async (req, res) => {
  try {
    const { cat, diff, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (cat && cat !== 'All') filter.category = cat;
    if (diff && diff !== 'all') filter.difficulty = diff;
    const videos = await Video.find(filter)
      .skip((page - 1) * limit).limit(Number(limit))
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const videos = await Video.find({ title: { $regex: q, $options: 'i' } });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id, { $inc: { 'stats.likes': 1 } });
  res.json({ message: 'Liked!' });
});

module.exports = router;
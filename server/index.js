const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected! ✅'))
  .catch(err => console.log('MongoDB error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'));

app.get('/', (req, res) => {
  res.json({ message: 'SkillTok API running! 🚀', version: '2.0' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

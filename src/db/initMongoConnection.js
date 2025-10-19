const mongoose = require('mongoose');

async function initMongoConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI in .env');

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    throw err;
  }
}

module.exports = { initMongoConnection };

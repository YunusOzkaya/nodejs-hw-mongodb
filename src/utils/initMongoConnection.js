const mongoose = require('mongoose');

async function initMongoConnection() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      console.warn(
        'MONGODB_URI not provided, skipping MongoDB connection (development mode)',
      );
      return;
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    // don't exit process here to allow local development work when DB is not available
    throw err;
  }
}

module.exports = { initMongoConnection };

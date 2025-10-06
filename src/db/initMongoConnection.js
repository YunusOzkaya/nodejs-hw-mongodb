const mongoose = require('mongoose');

async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  const envUri = process.env.MONGODB_URI;
  if (envUri) {
    try {
      await mongoose.connect(envUri);
      console.log(
        'Mongo connection successfully established using MONGODB_URI!',
      );
      return;
    } catch (err) {
      console.error('Mongo connection using MONGODB_URI failed:');
      console.error(err && err.message ? err.message : err);
    }
  }

  const user = MONGODB_USER ? encodeURIComponent(MONGODB_USER) : '';
  const password = MONGODB_PASSWORD ? encodeURIComponent(MONGODB_PASSWORD) : '';
  const uri = `mongodb+srv://${user}:${password}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error('Mongo connection error:');
    // Print a concise error message and some helpful hints
    console.error(err && err.message ? err.message : err);
    console.error('Hints: check MONGODB_USER/MONGODB_PASSWORD in your .env,');
    console.error(
      'and verify the user exists in MongoDB Atlas and the network access (IP whitelist) allows connections.',
    );
    throw err;
  }
}

module.exports = { initMongoConnection };

#!/usr/bin/env node
require('dotenv').config();
const mongoose = require('mongoose');
const { initMongoConnection } = require('../src/db/initMongoConnection');

(async () => {
  try {
    await initMongoConnection();
    console.log('Test connection: SUCCESS');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Test connection: FAILED');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  }
})();

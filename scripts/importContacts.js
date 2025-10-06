#!/usr/bin/env node
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { initMongoConnection } = require('../src/db/initMongoConnection');
const Contact = require('../src/models/Contact');

async function main() {
  try {
    const fileArg = process.argv[2] || 'contacts.json';
    const filePath = path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    let docs = [];
    try {
      docs = JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse JSON:', e.message);
      process.exit(1);
    }

    if (!Array.isArray(docs)) {
      console.error('JSON must be an array of documents');
      process.exit(1);
    }

    await initMongoConnection();

    const result = await Contact.insertMany(docs, { ordered: false });
    console.log(`Inserted ${result.length} documents into contacts collection`);
    process.exit(0);
  } catch (err) {
    console.error('Import failed:', err.message || err);
    process.exit(1);
  }
}

main();

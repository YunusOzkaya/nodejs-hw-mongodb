#!/usr/bin/env node
require('dotenv').config();

const user = process.env.MONGODB_USER || '<missing>';
const pass = process.env.MONGODB_PASSWORD || '<missing>';
const host = process.env.MONGODB_URL || '<missing>';
const db = process.env.MONGODB_DB || '<missing>';

function mask(s) {
  if (!s || s.length === 0) return '<empty>';
  if (s.length <= 4) return '*'.repeat(s.length);
  return s[0] + '*'.repeat(Math.min(6, s.length - 2)) + s[s.length - 1];
}

const maskedPass = mask(pass);
const uri = `mongodb+srv://${user}:${maskedPass}@${host}/${db}?retryWrites=true&w=majority`;

console.log('Constructed (masked) MongoDB URI:');
console.log(uri);
console.log('\nRaw values (for debugging, DO NOT share):');
console.log(`MONGODB_USER='${user}'`);
console.log(`MONGODB_PASSWORD length=${pass ? pass.length : 0}`);
console.log(`MONGODB_URL='${host}'`);
console.log(`MONGODB_DB='${db}'`);

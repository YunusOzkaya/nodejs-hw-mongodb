const Contact = require('../models/Contact');

async function getAllContacts() {
  return Contact.find().lean();
}

async function getContactById(id) {
  return Contact.findById(id).lean();
}

module.exports = { getAllContacts, getContactById };

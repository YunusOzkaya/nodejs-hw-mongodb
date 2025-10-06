const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();

const {
  getAllContactsCtrl,
  getContactByIdCtrl,
} = require('./controllers/contacts');

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(pino);

  app.get('/contacts', getAllContactsCtrl);
  app.get('/contacts/:contactId', getContactByIdCtrl);

  app.use((req, res) => res.status(404).json({ message: 'Not found' }));
  return app;
}

module.exports = { setupServer };

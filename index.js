require('dotenv').config();
const express = require('express');
const { initMongoConnection } = require('./src/db/initMongoConnection');
const contactsRouter = require('./src/routers/contacts');
const notFoundHandler = require('./src/middlewares/notFoundHandler');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/contacts', contactsRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  await initMongoConnection();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

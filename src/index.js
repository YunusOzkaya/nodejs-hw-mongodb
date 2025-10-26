require('dotenv').config();
const express = require('express');
const { initMongoConnection } = require('./db/initMongoConnection');
const contactsRouter = require('./routers/contacts');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

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

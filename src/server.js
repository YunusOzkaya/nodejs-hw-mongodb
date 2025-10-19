require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./routers/contacts');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use('/contacts', contactsRouter);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.error('Mongo connection error:', err.message));

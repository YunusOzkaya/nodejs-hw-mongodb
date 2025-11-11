require('dotenv').config();
const express = require('express');
const { initMongoConnection } = require('./utils/initMongoConnection');
const contactsRouter = require('./routers/contacts');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initMongoConnection();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

require('dotenv').config();
const { initMongoConnection } = require('./db/initMongoConnection');
const { setupServer } = require('./server');

(async () => {
  await initMongoConnection();
  const app = setupServer();
  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
})();

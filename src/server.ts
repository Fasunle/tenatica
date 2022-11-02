import express from 'express';
import admin from 'firebase-admin';

//
import config from './config/index';

// https://stackoverflow.com/questions/63744824/getting-express-default-is-not-a-function-error-when-i-run-node-server-in-a-co
const app = express();

// firebase admin
admin.initializeApp(config.firebaseAdminConfig);

// routes
app.use((req, res) => {
  res.send({ message: 'All good to go!' });
  return res.end();
});

app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`),
);

import express from 'express';
import admin from 'firebase-admin';
import { join } from 'path';
import favicon from 'serve-favicon';
import cors from 'cors';
import compression from 'compression';
//
import config from './config';
import usersRoutes from './users/user.controller';
import shareFileRoutes from './files/share.routes';
import errorHandler from './utils/error-handlers';

// https://stackoverflow.com/questions/63744824/getting-express-default-is-not-a-function-error-when-i-run-node-server-in-a-co
const app = express();

// firebase admin
const firebaseAdmin = admin.initializeApp(config.firebaseAdminConfig);
export const storage: any = firebaseAdmin
  .storage()
  .bucket(config.firebaseAdminConfig.storageBucket);
// upload files to firebase store
// middlewares
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(join(__dirname, '../public', 'favicon.ico')));
app.use('/api/public', express.static(join(__dirname, '../public')));

// routes
app.get('/', (req, res) => {
  res.send({ message: 'All good to go!' });
  return res.end();
});
//
app.use('/users', usersRoutes);
app.use('/files', shareFileRoutes);

// error handler
app.use(errorHandler);
app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`),
);

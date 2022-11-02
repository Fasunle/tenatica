import admin from 'firebase-admin';
import * as path from 'path';

const config = {
  firebaseAdminConfig: {
    credential: admin.credential.cert(path.join(__dirname, 'credentials.json')),
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
  },
  port: process.env.PORT || 5000,
};

export default config;

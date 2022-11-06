import express from 'express';
import { storage as storageRef } from '../server';
import localStorage from '../service/local-storage';
import { destinationFolder } from '../utils/destination';
import { uploadToFirebaseStorage } from '../service/uploads';

const route = express.Router();

route.post('/upload', localStorage, (req, res) => {
  const files: any = req.files;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  for (const file of files) {
    let destination = destinationFolder(file.filename);
    // unsupported format
    if (destination !== 'general' && file.name === 'delete') {
      uploadToFirebaseStorage(storageRef, file, destination)
        .then((uploaded) => console.log({ uploaded }))
        .catch(console.error);
    }
  }

  // TODO: delete all entries after uploading all

  res.json({ filename: 'nation-in-the-mud' }).end();
  res.get('/');
});

export default route;

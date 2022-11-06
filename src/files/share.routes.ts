import express from 'express';
import localStorage from '../service/local-storage';

const route = express.Router();

route.post('/upload', localStorage, (req, res) => {
  const files = req.files;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  res.json({ filename: 'nation-in-the-mud' }).end();
  res.get('/');
});

export default route;

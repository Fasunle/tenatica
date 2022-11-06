import express from 'express';

const route = express.Router();

route.post('/upload', (req, res) => {
  res.json({ filename: 'nation-in-the-mud' }).end();
});

export default route;

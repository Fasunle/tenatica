import express from 'express';
import localStorage from '../service/local-storage';
import { getAllFiles, uploadFile } from './files.service';

const route = express.Router();

// creating a new file
route.post('/upload', localStorage, uploadFile);

// get all files shared with a user
route.get('/', getAllFiles);

export default route;

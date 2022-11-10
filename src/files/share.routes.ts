import express from 'express';
import { isAuthenticated } from '../auth';
import localStorage from '../service/local-storage';
import { getAllFiles, uploadFile } from './files.service';

const route = express.Router();

// creating a new file
route.post('/upload', isAuthenticated, localStorage, uploadFile);

// get all files shared with a user
// route.get('/', getAllFiles);
route.get('/', isAuthenticated, getAllFiles);

export default route;

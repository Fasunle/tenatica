import express from 'express';
import { isAuthenticated } from 'src/auth';
import userService from './user.service';

const route = express.Router();

route.post('/', userService.createUser);
route.get('/:id', userService.getUser);
route.put('/:id', isAuthenticated, userService.updateUser);
route.delete('/:id', isAuthenticated, userService.deleteUser);

export default route;

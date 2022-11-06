import express from 'express';
import userService from './user.service';

const route = express.Router();

route.post('/', userService.createUser);
route.get('/:id', userService.getUser);
route.put('/:id', userService.updateUser);
route.delete('/:id', userService.deleteUser);

export default route;

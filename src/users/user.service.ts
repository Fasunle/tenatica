import { createDataResponse } from '../utils/response';
import { UserModel } from '../database/user.model';

/**
 * Fetch a user
 * @param req
 * @param res
 */
const getUser = async (req, res) => {
  const userId = (req.url as string).replace('/', '');
  const userModel = new UserModel();
  const user = await userModel.getUser(userId);
  if (!user)
    return res
      .status(404)
      .json({ message: 'User does not exist', status: 404 });

  res.status(200).json(user).end();
};

/**
 * Create a user.
 * @param req
 * @param res
 */
const createUser = async (req, res): Promise<{ data: ICreateUserResponse }> => {
  // validate the payload
  const userModel = new UserModel();
  const user = await userModel.create(req.body);
  if (user) return res.status(201).json(createDataResponse(user)).end();
  res.status(400).json({ message: user }).end();
};

/**
 * Update User information
 * @param req
 * @param res
 */
const updateUser = (req, res) => {
  res.json({ usename: 'Kehinde Fasunle' }).end();
};

/**
 * Delete a user
 * @param req
 * @param res
 */
const deleteUser = (req, res) => {
  res.json({ usename: 'Kehinde Fasunle' }).end();
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

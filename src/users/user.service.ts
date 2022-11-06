/**
 * Fetch a user
 * @param req
 * @param res
 */
const getUser = (req, res) => {
  res.json({ usename: 'Kehinde Fasunle' }).end();
};

/**
 * Create a user.
 * @param req
 * @param res
 */
const createUser = (req, res) => {
  res.json({ usename: 'Kehinde Fasunle' }).end();
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

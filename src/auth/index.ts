import { decode } from 'jsonwebtoken';

const userClaims = (token: string) => decode(token);

export const isAuthenticated = (req, res, next) => {
  try {
    const currentTime = Date.now();

    if (!req.headers.authorization)
      throw { essage: 'unauthorized', status: 403 };

    const tokens = req.headers['authorization'].split(' ');

    if (tokens[1] === '') throw { message: 'invalid credentials', status: 401 };

    if (tokens[0].toLowerCase() !== 'bearer')
      throw { message: 'invalid credentials', status: 401 };

    const claims = userClaims(tokens[1]);
    if (!(claims['email'] && claims['sub']))
      throw { message: 'Wrong token format', status: 403 };

    if (claims['exp'] < currentTime)
      throw { message: 'Token expired', status: 403 };

    const userEmail = claims['email'].trim();
    const userId = claims['sub'];
    req['userEmail'] = userEmail;
    req['userId'] = userId;

    next();
  } catch (error) {
    res
      .status(error.status)
      .json({ message: error.message, status: error.status });
  }
};

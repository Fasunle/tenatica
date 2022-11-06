import { ErrorRequestHandler } from 'express';
import config from '../config';
import logger from '../logger';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (config.environment === 'development') logger.error(err?.message);
  return res
    .status(500)
    .json({ statusCode: 500, message: 'Error Occured' })
    .end();
};

export default errorHandler;

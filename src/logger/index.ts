import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const LoggerMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\nPayload >>>>>\n');
    logger.info({
      body: req.body,
    });
  }

  next();
};

export default logger;

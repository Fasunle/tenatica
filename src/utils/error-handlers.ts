import { NextFunction } from "express"
import logger from "src/logger"


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if ( err ) {
        logger.error( err?.message );
  }
}

export default errorHandler;
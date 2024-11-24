import { Request, Response, NextFunction } from 'express';
import { ApiError, HTTP_RESPONSE } from '../utils/httpResponse';
import multer from 'multer';

export const errorMiddlewares = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.code).json({
      status: err.status,
      message: err.message
    });
    return;
  }

  console.error(err);
  res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR.code).json({
    status: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.status,
    message: HTTP_RESPONSE.INTERNAL_SERVER_ERROR.message
  });
};

export const fileSizeErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    res.status(HTTP_RESPONSE.PAYLOAD_TOO_LARGE.code).json({
      status: HTTP_RESPONSE.PAYLOAD_TOO_LARGE.status,
      message: 'Payload content length greater than maximum allowed: 1000000'
    });
  } else {
    next(err);
  }
};

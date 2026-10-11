import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
        details: err.details,
      },
    });
    return;
  }

  // Unhandled / Internal Server Error
  console.error('[UNHANDLED_ERROR]:', err);
  const isDev = process.env.NODE_ENV !== 'production';

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      statusCode: 500,
      ...(isDev ? { stack: err.stack, details: err.message } : {}),
    },
  });
};

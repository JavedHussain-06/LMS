import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorHandleMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error! ⚠️";

  // wrong mondoDB id
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `OOPS! Invalid Json Web Token, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `OOPS! Json Web Token Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

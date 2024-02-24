require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.access_token;

      if (!accessToken) {
        return next(new ErrorHandler("Please provide an access token", 400));
      }

      // Verify the token
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;

      // Check if decoding was successful
      if (!decoded) {
        return next(new ErrorHandler("Access token is invalid", 400));
      }

      // Retrieve user data from Redis
      const user = await redis.get(decoded._id.toString());

      // Check if user exists
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      // Attach user data to the request object
      req.user = JSON.parse(user);

      // Proceed to the next middleware
      next();
    } catch (error) {
      // Handle token verification errors
      return next(new ErrorHandler("Invalid access token", 401));
    }
  }
);

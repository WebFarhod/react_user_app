import { NextFunction, Request, Response } from "express";
import BaseError from "../utils/base.error";

const ErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  return res.status(500).json({ message: "Server error" });
};

export default ErrorMiddleware;

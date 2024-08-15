import { NextFunction, Request, Response } from "express";
import BaseError from "../utils/base.error";
import jwt from "../utils/jwt";
import UserService from "../services/user.service";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return next(BaseError.UnauthorizedError());
    }
    const accressToken = auth.split(" ")[1];
    if (!accressToken) {
      return next(BaseError.UnauthorizedError());
    }
    const userData = jwt.validateAccessToken(accressToken);
    if (!userData) {
      return next(BaseError.UnauthorizedError());
    }

    const user = await UserService.findUserById(userData.sub);
    if (!user) {
      return next(BaseError.BadRequest("User does not exist"));
    }
    if (!user.isApproved) {
      return next(BaseError.BadRequest("User not approved"));
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(BaseError.UnauthorizedError());
  }
};
export default AuthMiddleware;

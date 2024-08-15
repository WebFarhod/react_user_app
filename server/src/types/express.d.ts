import IJwtUser from "./user";

declare global {
  namespace Express {
    interface Request {
      user: IJwtUser;
    }
  }
}

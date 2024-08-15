import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

class UserController {
  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.findAll();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await UserService.findUserById(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updaterId = req.user.sub;
      const data = await UserService.delete(id, updaterId);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async approvUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updaterId = req.user.sub;
      const data = await UserService.approvUser(id, updaterId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async disableUserByAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const updaterId = req.user.sub;
      const data = await UserService.disableUserByAdmin(id, updaterId);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

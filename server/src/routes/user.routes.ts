import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/read-all", AuthMiddleware, UserController.readAll);
router.get("/read/:id", AuthMiddleware, UserController.read);
router.delete("/delete/:id", AuthMiddleware, UserController.delete);
router.post("/approv/:id", AuthMiddleware, UserController.approvUser);
router.post(
  "/disable-user/:id",
  AuthMiddleware,
  UserController.disableUserByAdmin
);

export default router;

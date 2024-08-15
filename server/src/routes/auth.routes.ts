import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/get-users", AuthMiddleware, AuthController.getUser);
router.get("/refresh", AuthController.refresh);

export default router;

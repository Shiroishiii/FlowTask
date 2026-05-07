import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    return authController.register(req, res);
});

authRouter.post("/login", async (req, res) => {
    return authController.login(req, res);
});

authRouter.post("/logout", async (req, res) => {
    return authController.logout(req, res);
});
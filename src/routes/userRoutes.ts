import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

export const usuarioRouter = Router();

usuarioRouter.get('/usuarios', auth, async (req, res) => {
    return userController.listUsers(req, res);
});

usuarioRouter.get('/usuarios/:id', auth, async (req, res) => {
    return userController.getUserId(req, res);
});
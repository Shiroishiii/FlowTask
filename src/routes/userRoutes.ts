import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { TipoConta } from "@prisma/client";

export const usuarioRouter = Router();

usuarioRouter.get('/usuarios', auth, async (req, res) => {
    return userController.listUsers(req, res);
});

usuarioRouter.get('/usuarios/:id', auth, async (req, res) => {
    return userController.getUserId(req, res);
});
usuarioRouter.get("/teste", auth, roleMiddleware([TipoConta.ADMIN]), async (req, res) => {
    return res.json({
        ok: true
    });
});
usuarioRouter.get("/me", auth, async (req, res) => {
    return userController.getProfile(req, res); 
});